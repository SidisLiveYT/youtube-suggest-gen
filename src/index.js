const { search } = require('play-dl');
const { randomOne } = require('proxies-generator');
const { getBasicInfo, relatedVideo } = require('ytdl-core');
const HttpsProxyAgent = require('https-proxy-agent');

/**
 * Default Filter Options for Youtube Suggestions
 */
const DefaultFilterOptions = {
  random: true,
  proxy: undefined,
  ytcookies: undefined,
};

/**
 * @class SuggestionGen -> Youtube Video Suggestions Generator
 */
class SuggestionGen {
  /**
   * @param {String} #YTProxy Caching Proxy Vlaue for function
   */
  static #YTProxy = undefined;

  /**
   * @param {String} #YTCookies Caching YT Cookies Vlaue for function
   */
  static #YTCookies = undefined;

  /**
   * @method YTSuggestions() -> Fetch Suggestions from Youtube Filtered with Options
   * @param {String} YTQuery Youtube Video URL or Search Query | if 'all' , then it will return everything
   * @param {Number|String|undefined} Limit Limit the Return Array Values
   * @param {DefaultFilterOptions<Object>|undefined} Filter Filter Options for randomness , proxy vlaues or cookies in search
   * @returns {Promise<relatedVideo[]>|undefined} Returns Array of Suggestions from ytdl-core . or else returns undefined for errors
   */
  static async YTSuggestions(
    YTQuery,
    Limit = 1,
    Filter = DefaultFilterOptions,
  ) {
    if (!YTQuery || (YTQuery && typeof YTQuery !== 'string')) return void null;
    const PlaydlQuery = await search(YTQuery);
    if (!PlaydlQuery || (PlaydlQuery && !PlaydlQuery[0])) return void null;
    try {
      SuggestionGen.#YTProxy = Filter.proxy ?? SuggestionGen.#YTProxy;
      SuggestionGen.#YTCookies = Filter.ytcookies ?? SuggestionGen.#YTCookies;
      const agent = SuggestionGen.#YTProxy
        ? HttpsProxyAgent(SuggestionGen.#YTProxy)
        : undefined;
      const RelatedVideos = (
        await getBasicInfo(PlaydlQuery[0].url, {
          requestOptions:
            agent
            ?? (SuggestionGen.#YTCookies
              ? {
                headers: {
                  cookie: SuggestionGen.#YTCookies,
                },
              }
              : undefined)
            ?? undefined,
        })
      ).related_videos;
      if (!RelatedVideos || (RelatedVideos && !RelatedVideos[0])) return void null;
      const VideosCache = [];
      let RandomIndex = 0;
      Limit = Limit === 'all' ? RelatedVideos.length : Limit;
      for (let count = 0, len = RelatedVideos.length; count < len; ++count) {
        if (Number(Limit) <= VideosCache.length) break;
        else if (Filter.random) {
          RandomIndex = Math.floor(Math.random() * (RelatedVideos.length - 1));
          VideosCache.push(RelatedVideos[RandomIndex - 1]);
        } else VideosCache.push(RelatedVideos[count]);
      }
      return VideosCache;
    } catch (error) {
      if (
        !(
          (error.message && !error.message.includes('429'))
          || `${error}`.includes('429')
        )
      ) throw error;
      Filter.proxy = await randomOne(true);
      return await SuggestionGen.YTSuggestions(YTQuery, Limit, Filter);
    }
  }
}
module.exports = {
  suggestions: SuggestionGen.YTSuggestions,
};
