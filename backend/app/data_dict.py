jobs = {
    "JobID1": {
        "Title": "Senior Software Engineer",
        "Company": "Google",
        "Link": "https://careers.google.com/jobs/results/116958901158453958-senior-software-engineering-manager-ar/?f=true&page=29&utm_campaign=google_jobs_apply&utm_medium=organic&utm_source=google_jobs_apply",
        "Date": "2/13/2023",
        "Skills": ["Python", "Excel"],
        "Locations": ["San Francisco, CA"],
        "Image": "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png",
    },
    "JobID2": {
        "Title": "Data Analyst",
        "Company": "Simplex",
        "Link": "https://jobs.myjobhelper.com/signup?prodid=9874&jobkey=558369-1031810&feedId=3113&pubId=9874&pubFeedId=426&jobType=&pubClickId=374533662&feedOverCap=N&company=Simplex&utm_medium=cpc&utm_source=9874&utm_campaign=xml-426&utm_content=Data%20Analyst&utm_term=Simplex&l=&ccuid=",
        "Date": "2/12/2023",
        "Skills": ["Excel", "SQL"],
        "Locations": ["Austin, TX"],
        "Image": "https://media.myjobhelper.com/img/srlogos/s/simplex.com",
    },
    "JobID3": {
        "Title": "Front-End Web & Email Developer",
        "Company": "ISACA",
        "Link": "https://www.careerbuilder.com/job/JMD8822079GH94MYSRE?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
        "Date": "2/13/2023",
        "Skills": ["Web Development", "SQL"],
        "Locations": ["Chicago, IL"],
        "Image": "https://cdn.lensa.com/img/company-logos/9ae809d83d227dfaba16160ef2edbbadbfb48907871b025c3109d00ebd0ab216",
    },
}

skills = {
    "Excel": {
        "Name": "Excel",
        "Certifications": "Microsoft Office Specialist",
        "Level": "Easy",
        "Industry": "Any",
        "Courses": ["CourseID3"],
    },
    "Python": {
        "Name": "Python",
        "Certifications": "Python Certification",
        "Level": "Easy",
        "Industry": "Technology",
        "Courses": ["CourseID1", "CourseID2"],
    },
    "Web Development": {
        "Name": "Web Development",
        "Certifications": "Web Development Certification",
        "Level": "Hard",
        "Industry": "Technology",
        "Courses": ["CourseID4"],
    },
    "SQL": {
        "Name": "SQL",
        "Certifications": "SQL Certification",
        "Level": "Intermediate",
        "Industry": "Technology",
        "Courses": ["CourseID5"],
    },
}

locations = {
    "Austin": {
        "City": "Austin",
        "State": "TX",
        "Unemployment": "6",
        "Salary": "$52,500",
        "Rent": "$1,100",
        "Image": "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/austin/austin2_copy_1__211bcd0d-a354-4c0f-8203-107ad7774905.jpg",
    },
    "San Francisco": {
        "City": "San Francisco",
        "State": "CA",
        "Unemployment": "5",
        "Salary": "$60,000",
        "Rent": "$1,500",
        "Image": "https://cdn.travelpulse.com/images/d3a9edf4-a957-df11-b491-006073e71405/e864929d-127a-4caf-9a15-7f9cd45160f0/630x355.jpg",
    },
    "Chicago": {
        "City": "Chicago",
        "State": "IL",
        "Unemployment": "7.5",
        "Salary": "$61,500",
        "Rent": "$1,550",
        "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Chicago_Skyline_Oct_2022_2.jpg/800px-Chicago_Skyline_Oct_2022_2.jpg",
    },
}

courses = {
    "CourseID1": {
        "Name": "CS50: Introduction to Computer Science",
        "Time": "10-20 hours per week",
        "Cost": "$149.00",
        "Provider": "Harvard",
        "Link": "https://pll.harvard.edu/course/cs50-introduction-computer-science?delta=0",
    },
    "CourseID2": {
        "Name": "System Design from Scratch",
        "Time": "10-20 hours",
        "Cost": "Free",
        "Provider": "Youtube",
        "Link": "https://www.youtube.com/playlist?list=PLfBJlB6T2eOukvc2lrkAbeZBqUS94ji1r",
    },
    "CourseID3": {
        "Name": "The Ultimate Excel Tutorial",
        "Time": "5 hours",
        "Cost": "Free",
        "Provider": "Youtube",
        "Link": "https://youtu.be/TpOIGij43AA",
    },
    "CourseID4": {
        "Name": "The Complete 2021 Web Development Bootcamp",
        "Time": "10-20 hours per week",
        "Cost": "$149.99",
        "Provider": "Udemy",
        "Link": "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    },
    "CourseID5": {
        "Name": "SQL Full Course [2023]",
        "Time": "10 hours",
        "Cost": "Free",
        "Provider": "Youtube",
        "Link": "https://www.youtube.com/playlist?list=PL9ooVrP1hQOG6DQnOD6ujdCEchaqADfCU",
    },
}

if __name__ == "__main__":
    print(courses[skills["Excel"]["Courses"][0]])
