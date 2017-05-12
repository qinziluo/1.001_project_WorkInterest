# WorkInterest
Project for MIT 1.001
by Jiamin Sun & Qinzi Luo from Massachusetts Institute of Technology

Workinterest is job platform based on geographic visualization. 15000 pieces of Unites states job opening data are obtained from business websites. Based on those data sets, jobtiles, locations, frequency of the keyword, the most popular companies in one specific area are analyzed and displayed. Additionally, top jobs's salaries in one area is queried by request google search. 

In the map folder, load mapCircle in the browser and enjoy. 

Libraries required:
Cheerio/
D3/
Modal/
fs/
google charts/


When we request the job information per area, we can get the total amount of jobs in one city. First, we get a  set of data which is an object describing the amount of jobs in each city. Then we requested google search, get the salaries data. Raw data and analysis code are in corresponding folders. 


After getting all job information in a city, the next step is filtering and cleaning all data. The data sets are in a mess which could be found in "localdataset" folder. A large array contains over 10 thousands of job position objects. For every job position, we can know the job title, company name, city , state, url and more. We only need the useful information. So, we write several js files to clean data. In "try0501" file, the first function is used for get basic info. Then, we would like to get all the company name string, and all single words in the job titles. In this part, we review and apply the knowledge learned in problem set 4 , change the words  to ordinary format and delete some common unnecessary words such as 'and', 'the'. Next, we want to know the frequency of every word or string. we get the function wordcount. The final step is sorting the wordcount from the most frequent to the least frequent.  Because actual job titles are sets of phrases, such as software engineer. These single key words from job titles cannot be used to identify the most popular job titles. Thus, we calculated the frequency of every words in a job title, for example, “software” and “engineer”, and sum them up to represent the frequency of the job title ,”software engineer”. Then, we get the top 50 most popular jobs to be used to request salaries.
In addition, when users focus on a certain city, they usually want to know the largest companies in this region.  So we collect all company data, sort them according to the job opening numbers. The companies providing more job opportunities are always large and have higher reputation. After we get all useful information, we write them into JSON files to be used in html. Those JOSN files can be found in "localdataset" folder called "cityname+jobdata" or "cityname+companydata".

Then we move to the user interface and visualization. In html files, we want to visualize all the useful information by D3 and google charts. Considering the data format, we decide to use a bar chart to show companys and use a bubble chart to show the key words.  Based on aesthetic property, we only pick out the top 20 company names. We learned the webpage layout and google charts options. "googlechart" file contains our detailed settings.
This is our webpage showing the key words and company names. Through the charts, the user can clearly see the most important job types or characteristics. Combining users’ own abilities, they can get to know whether they are suitable for working there. Generally, the companies providing most job opportunities always have the best reputation, great influence and work environment. By thinking about the most popular companies, the user always prefer to choose one of them. 
