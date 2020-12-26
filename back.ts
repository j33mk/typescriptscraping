import axios from 'axios';
import cheerio from 'cheerio';

// const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance

interface CoverStory{
    coverStoryTitle:string,
    coverStoryLink:string
}
const urls:string[] = [
'https://www.dawn.com',
'https://www.dawn.com/latest-news',
'https://www.dawn.com/pakistan',
'https://www.dawn.com/business',
'https://www.dawn.com/opinion',
'https://www.dawn.com/sport',
'https://www.dawn.com/magazines',
'https://www.dawn.com/world',
'https://www.dawn.com/tech',
'https://www.dawn.com/prism',
'https://www.dawn.com/popular',
'https://www.dawn.com/multimedia',
]

const scrapDawnNewsPaper=async (urls:string[])=>{
    const coverStories:CoverStory[] = [];
    const promises:any[] = [];
    urls.forEach(url=>{
        promises.push(
            AxiosInstance.get(url).then(response=>{
                const html = response.data; // Get the HTML from the HTTP request
                const $ = cheerio.load(html); // Load the HTML string into cheerio
                const stories: any = $('a.story__link'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
                stories.each((i,elem)=>{
                    const coverStoryTitle:string = $(elem).text();
                    const coverStoryLink:string = $(elem).attr('href');
                        coverStories.push({
                            coverStoryTitle,coverStoryLink
                        });         
                });
            })
        );
    }) 
    return await Promise.all(promises).then(()=>{
        return coverStories;
    });   
}
scrapDawnNewsPaper(urls).then(response=>{
    console.log(response);
}).catch(error=>{
    console.log("Some error occured try again");
});
