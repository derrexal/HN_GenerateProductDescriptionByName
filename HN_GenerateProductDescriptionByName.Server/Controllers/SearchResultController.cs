using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;

namespace HN_GenerateProductDescriptionByName.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchResultController : ControllerBase
    {
        private readonly string _baseUrl = "http://127.0.0.1:7000/google/search";
        //"GET http://127.0.0.1:7000/google/search?text=Гугл&lang=RU&limit=5"

        private readonly ILogger<SearchResultController> _logger;
        public SearchResultController(ILogger<SearchResultController> logger)
        {
            _logger = logger;
        }


        [HttpGet(Name = "GetSearchResult")]
        public async Task<IList<SearchResult>> Get(string query) 
        {
            HttpClient httpClient = new HttpClient();
            string? jsonResponse = null;
            string url = ConstructUri(query);
            
            try
            {
                using var response = await httpClient.GetAsync(url);
                jsonResponse = await response.Content.ReadAsStringAsync();
                var results = JsonConvert.DeserializeObject<List<SearchResult>>(jsonResponse);
                if (results != null)
                    return results;
                throw new HttpRequestException("Поисковый движок не вернул ответ");
            }

            catch (JsonReaderException)
            {
                _logger.LogError($"Не удалось распарсить ответ в JSON. Далее последует стек ошибок php сервиса\n\n{jsonResponse}");
                throw;
            }

            catch (HttpRequestException e)
            {
                _logger.LogError($"Не доступен сервис php\n{e}");
                throw;
            }
        }

        private string ConstructUri(string query)
        {
            return _baseUrl + "?text=" + query + "&lang=RU&limit=5";
        }
    }
}
