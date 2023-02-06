from flask import Flask, render_template, request, redirect, url_for
from gitlab import get_commits, get_issues


#Below lines of code are imports for the "FastAPI" for stocks
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from fastapi import FastAPI



app = Flask(__name__)

fastAPI = FastAPI(
        title="⚡ Real-time stocks/Crypto API 🗠",
        description="`GET real time stocks/Cryptocurrency info for a specific stock or a crpytocurrency`",
        version='0.0.1'
        )


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
	commits = get_commits()
	total_issues = get_issues()
	return render_template('about.html', commits=commits, total_issues=total_issues)

@app.route('/jobs')
def jobs():
	return render_template('jobs.html')

@app.route('/skills')
def skills():
	return render_template('skills.html')

@app.route('/courses')
def courses():
	return render_template('courses.html')

@app.route('/locations')
def location():
	return render_template('locations.html')

@app.route('/contact')
def contact():
	return render_template('contact.html')

@app.route('/other')
def other():
	return render_template('other.html')



#Fetching Company info
@app.get('/stock/{company}')
def stocks_data(company: str):
    
    # prevent crypto stuff from showing up in stocks stuff.
    if '-' in company:
        return {"Error":f"abbreviations \'{company}\' NOT Found. Check /docs for Usage."} 
    data = fetch_info(company)
    print(data)
    return data



def fetch_info(company):
    url = f"https://finance.yahoo.com/quote/{company}/"

    #headers cause we're scraping
    page = urlopen(Request(url,headers={"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/35.0.1916.47 Safari/537.36"}))
    page = page.read().decode('utf-8')
    
    # The parser obj    
    soup = BeautifulSoup(page, "html.parser")


    try:
        co_title = soup.find_all('h1',{'class':'D(ib) Fz(18px)'})[0].string
        curr_price = soup.find_all('fin-streamer',{'class':'Fw(b) Fz(36px) Mb(-4px) D(ib)'})
        curr_price = curr_price[0].string

        stata = soup.find_all('td',{'class':'Ta(end) Fw(600) Lh(14px)'})


        data = {
                "Company":co_title,
                "Current-Price":curr_price,
                "Net Assets":stata[8].string,
                "prevClose":stata[0].string,
                "openPrice":stata[1].string,
                "52 week-avg":stata[5].string
               }
    
        return data   
        
    except:
       return {"Error":f"abbreviation \'{company}\' NOT Found"} 




if __name__ == '__main__':
	app.debug = True
	app.run(host = '0.0.0.0', port = 5000)