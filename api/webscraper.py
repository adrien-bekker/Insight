from flask import Blueprint, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time

main = Blueprint("main", __name__)

# Runs a headless version of Chrome
option = webdriver.ChromeOptions()
option.add_argument("headless")


@main.route("/globalnews")
def globalNews():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH, options=option)

    # Goes to link
    driver.get("https://www.cnn.com/world")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[7]/section[1]/div[2]/div/div[1]/ul/li[1]/article/div/div[2]/h3/a/span[1]")
                                           ))
        link = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "/html/body/div[7]/section[1]/div[2]/div/div[1]/ul/li[1]/article/div/div[2]/h3/a"))
        )
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[7]/section[1]/div[2]/div/div[1]/ul/li[1]/article/div/div[1]/a/img")
                                           ))
        return jsonify({"title": article.text, "link": link.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/nationalnews")
def nationalNews():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.cnn.com/us")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[8]/section[1]/div[2]/div/div[1]/ul/li[1]/article/div/div[2]/h3/a/span[1]")
                                           ))
        link = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "/html/body/div[8]/section[1]/div[2]/div/div[1]/ul/li[1]/article/div/div[1]/a"))
        )
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[8]/section[1]/div[2]/div/div[1]/ul/li[1]/article/div/div[1]/a/img")
                                           ))
        return jsonify({"title": article.text, "link": link.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/localnews/<coords>")
def localNews(coords):

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    try:
        # Goes to link
        driver.get(f"https://www.google.com/maps/search/{coords}/")

        # Grabs user location
        location = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "/html/body/jsl/div[3]/div[9]/div[8]/div/div[1]/div/div/div[8]/div/div[1]/span[3]/span[3]"))
        )

        location = location.text

        # Goes to link
        driver.get("https://news.yahoo.com/")

        # Gets news from their location
        search = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "/html/body/div[1]/div/div[1]/div/div[1]/div[1]/div/div/div/div/div/div/div[2]/div/div[2]/form/table/tbody/tr/td[1]/div/div/div[1]/input"))
        )

        search.send_keys(location, Keys.ENTER)

        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div[3]/div/div/div[1]/div/div/div/div/ol/li[1]/div/ul/li/h4/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div[3]/div/div/div[1]/div/div/div/div/ol/li[1]/div/ul/li/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/covidnews")
def covidNews():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://abcnews.go.com/Health/Coronavirus")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div/main/div[3]/div[1]/div/div/div[2]/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div/main/div[3]/div[1]/a/figure[1]/div[2]/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/weather")
def weather():
    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.wunderground.com/")

    try:
        weather = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/app-root/app-home-page/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[4]/div[1]/div/div[1]/div/app-conditions-card/div/div/div/div/div[2]/a/div/div[2]/div[1]")
                                           ))
        link = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/app-root/app-home-page/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[4]/div[1]/div/div[1]/div/app-conditions-card/div/div/div/div/div[4]/a"
                                            ))
        )
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/app-root/app-home-page/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[4]/div[1]/div/div[1]/div/app-conditions-card/div/div/div/div/div[2]/a/div/div[1]/img")
                                           ))

        return jsonify({"title": weather.text, "link": link.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/education")
def education():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://mobile.edweek.org/index.jsp?DISPATCHED=true")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[3]/div[4]/div/div[2]/div[1]/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[3]/div[4]/div/div[2]/div[2]/table/tbody/tr/td[2]/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/meditation")
def meditation():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.mindful.org/category/meditation/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div[13]/div/section[1]/div[1]/div[1]/article/div/h2/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div[13]/div/section[1]/div[1]/div[1]/article/header/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/foodanddiet")
def food_and_diet():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.cnn.com/specials/health/food-diet")

    try:
        title = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "/html/body/div[7]/section[1]/div[2]/div/div[1]/ul/li/article/div/div[2]/h3/a/span[1]"))
        )
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[7]/section[1]/div[2]/div/div[1]/ul/li/article/div/div[2]/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[7]/section[1]/div[2]/div/div[1]/ul/li/article/div/div[1]/a/img")
                                           ))
        return jsonify({"title": title.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/workout")
def workout():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.self.com/fitness")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/section/div[3]/div[2]/div[1]/div/div[1]/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/section/div[3]/div[1]/picture/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/positivenews")
def positive_news():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://notallnewsisbad.com/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div/div/main/article[1]/header/h2/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div/div/main/article[1]/div/p[1]/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/biology")
def biology():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://phys.org/biology-news/")

    try:
        time.sleep(1.5)
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/div/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/figure/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/chemistry")
def chemistry():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://phys.org/chemistry-news/")

    try:
        time.sleep(1.5)
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/div/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/figure/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/robotics")
def robotics():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://phys.org/technology-news/robotics/")

    try:
        time.sleep(1.5)
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/div/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/figure/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/computerscience")
def computer_science():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://phys.org/technology-news/computer-sciences/")

    try:
        time.sleep(1.5)
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/div/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/figure/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/engineering")
def engineering():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://phys.org/technology-news/engineering/")

    try:
        time.sleep(1.5)
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/div/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div/div[1]/div[1]/div[4]/div/div[1]/article[1]/div[1]/figure/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/climate")
def climate():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.dailyclimate.org/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[4]/div/div[5]/div/div[1]/div/div/div/div/article/div/div/div[2]/h1/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[4]/div/div[5]/div/div[1]/div/div/div/div/article/div/div/div[1]/a/div")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("data-runner-img-md")})
    finally:
        driver.quit()


@main.route("/astronomy")
def astronomy():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.space.com/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[5]/div[2]/div[2]/section/div[1]/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[5]/div[2]/div[2]/section/div[1]/a/figure/div/div/picture/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/medicine")
def medicine():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.medicalnewstoday.com/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[3]/div[1]/div[4]/div[1]/ul/li[1]/div/div/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[3]/div[1]/div[4]/div[1]/ul/li[1]/div/figure/a/span/span/lazy-image/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/moviesandtv")
def movies_and_tv():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://collider.com/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[5]/section/section/div/article[1]/div/header/h2/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[5]/section/section/div/article[1]/div/p[1]/a/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/sports")
def sports():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.usatoday.com/sports/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div[1]/div[1]/a[1]/span")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/main/div[1]/div[1]/a[1]/img")
                                           ))
        link = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "/html/body/main/div[1]/div[1]/a[1]"))
        )
        return jsonify({"title": article.text, "link": link.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/music")
def music():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://www.rollingstone.com/music/music-news/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[3]/div[2]/div[2]/main/div[2]/ul/li[1]/article/a/header/h3")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[3]/div[2]/div[2]/main/div[2]/ul/li[1]/article/a/figure/div/img")
                                           ))
        link = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "/html/body/div[3]/div[2]/div[2]/main/div[2]/ul/li[1]/article/a"))
        )
        return jsonify({"title": article.text, "link": link.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/videogames")
def video_games():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://screenrant.com/gaming/")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div[4]/div/div[2]/section/div/article[1]/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div[4]/div/div[2]/section/div/article[1]/a/div/div/picture/source[8]")
                                           ))

        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("srcset")[:-5]})
    finally:
        driver.quit()
