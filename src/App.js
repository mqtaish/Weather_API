import logo from "./logo.svg";
import CloudIcon from "@mui/icons-material/Cloud";
import "./App.css";


// MATERIAL UI COMPONENT 
import {
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

// EXTERNAL LIBRARIES  
import axios from "axios";
import moment from "moment";
import { useTranslation } from 'react-i18next';
import 'moment/locale/ar';
moment.locale('ar');

const theme = createTheme({
  typography: {
    fontFamily: ["Cairo"],
  },
});
let cancel = null;

function App() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState(null)
  const [temp, setTemp] = useState({
    number: null,
    max: null,
    min: null,
    description: "",
  });
  const [locale, setLocale] = useState("ar");
  const direction = (locale === "ar") ? "rtl" : "ltr";
  useEffect(() => {
    i18n.changeLanguage("ar");
    const dataAndTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    setDateAndTime(dataAndTime);
    console.log("rendering the component");
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.96&lon=35.93&appid=b8c98798fcbc864d790595f603981ef3",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancel = c;
          }),
        }
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        console.log(response);
        setTemp({
          number: responseTemp,
          max,
          min,
          description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png `,
        });
      })
      .catch(function (error) { })
      .finally(function () {
        // always executed
      });

    return () => {
      console.log("cancelling");
      cancel();
    };
  }, []);

  // EVENTS HANDLERS
  const handleLanguageClick = () => {
    if (locale == "ar") {
      setLocale("en")
      i18n.changeLanguage("en");
      moment.locale('en');


    } else {
      setLocale("ar")
      i18n.changeLanguage("ar");
      moment.locale('ar');
    }

    setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));

  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div
              dir={direction}
              style={{
                width: "100%",
                backgroundColor: "rgb(28 52 91 / 36% )",
                color: "white",
                padding: "20px",
                borderRadius: "6px",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "end",
                  }}
                  dir={direction}
                >
                  <Typography variant="h2"> {t("Jordan")}</Typography>
                  <Typography variant="h5" style={{ margin: "0 20px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/* CITY & TIME */}
                <hr />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      <img src={temp.icon} />
                    </div>
                    {/*== TEMP ==*/}
                    <Typography variant="h6">{t(temp.description)}</Typography>

                    {/* MIN & MAX */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h5>{temp.min}: {t("min")} </h5>
                        <h5 style={{ margin: "0px 10px" }}> | </h5>
                        <h5>{temp.max}: {t("max")} </h5>
                      </div>
                    </div>
                  </div>
                  {/*=== DEGREE & DESCRIPTION ===*/}
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/*== CONTAINER OF DEGREE + CLOUD ICON ==*/}
              </div>
              {/* == CONTENT ==*/}
            </div>
            {/* == CARD == */}

            {/* TRANSLATION BUTTON */}
            <div
              dir={direction}
              style={{
                marginTop: "15px",
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button onClick={handleLanguageClick} variant="text" style={{ color: "white" }}>
                {(locale == "ar") ? "انجليزي" : "Arabic"}
              </Button>
            </div>
            {/*== TRANSLATION BUTTON ==*/}
          </div>
          {/* CONTENT CONTAINER */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
