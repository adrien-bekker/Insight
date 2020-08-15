from flask import Blueprint, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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
    driver.get("https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/c-wiz/div/div[2]/c-wiz/div/ div[2]/div/main/c-wiz/div/div/main/div[1]/div[1]/div/div/article/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/c-wiz/div/div[2]/c-wiz/div/div[2]/div/main/c-wiz/div/div/main/div[1]/div[1]/div/div/a/figure/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/nationalnews")
def nationalNews():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/c-wiz/div/div[2]/c-wiz/div/ div[2]/div/main/c-wiz/div/div/main/div[1]/div[1]/div/div/article/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/c-wiz/div/div[2]/c-wiz/div/div[2]/div/main/c-wiz/div/div/main/div[1]/div[1]/div/div/a/figure/img")
                                           ))
        return jsonify({"title": article.text, "link": article.get_attribute("href"), "image": image.get_attribute("src")})
    finally:
        driver.quit()


@main.route("/localnews")
def localNews():

    # Location of chrome web driver
    PATH = "D:\chromedriver_win32\chromedriver.exe"
    driver = webdriver.Chrome(PATH)

    # Goes to link
    driver.get("https://news.google.com/topics/CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE/sections/CAQiTkNCSVNORG9JYkc5allXeGZkakpDRUd4dlkyRnNYM1l5WDNObFkzUnBiMjV5Q2hJSUwyMHZNSGgwTkd0NkNnb0lMMjB2TUhoME5Hc29BQSowCAAqLAgKIiZDQklTRmpvSWJHOWpZV3hmZGpKNkNnb0lMMjB2TUhoME5Hc29BQVABUAE?hl=en-US&gl=US&ceid=US%3Aen")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/c-wiz[2]/div/div[2]/c-wiz/div/div[2]/div[2]/span[1]/div/div/main/c-wiz/div/div/main/div[1]/div[1]/div/article/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/c-wiz[2]/div/div[2]/c-wiz/div/div[2]/div[2]/span[1]/div/div/main/c-wiz/div/div/main/div[1]/div[1]/a/figure/img")
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
    driver.get("https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNREZqY0hsNUVnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen")

    try:
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/c-wiz/div/div[2]/c-wiz/div/div[2]/div[2]/span[1]/div/div/main/c-wiz/div/div/main/div[1]/div[1]/div/div[2]/article[1]/h3/a")
                                           ))
        image = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "/html/body/c-wiz/div/div[2]/c-wiz/div/div[2]/div[2]/span[1]/div/div/main/c-wiz/div/div/main/div[1]/div[1]/div/div[2]/article[1]/figure/img")
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
