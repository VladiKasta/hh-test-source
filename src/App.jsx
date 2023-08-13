import "./App.css";
import React, { useState } from "react";
import { YandexLogin, YandexLogout } from "react-yandex-login";
import axios from "axios";
import allowCors from "../cors.js";
const clientID = "4a1e129494ca4c99b064a397159174c1";

function App() {
  const [userData, setUserData] = useState(undefined);
  const [files, setFiles] = useState(undefined);
  const [ready, setReady] = useState(false);

  const loginSuccess = (userData) => {
    setUserData(userData);
    localStorage.setItem("token", userData.access_token);
  };

  const logoutSuccess = () => {
    setUserData(null);
  };

  async function uploadFiles() {
    // ПОЛУЧЕНИЕ ССЫЛКИ НА СКАЧИВАНИЕ =================
    try {
      Array.from(files).forEach((file) => {
        axios
          .get(
            `https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2F%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B8%2F${file.name}`,
            {
              headers: {
                Authorization:
                  "OAuth y0_AgAAAABntSSFAApE3AAAAADpHqf2tAEyA2RgQ86cNGNp5Qwa1nrRkp8",
              },
            }
          )
          //============================
          // ЗАГРУЗКА ФАЙЛОВ ПО ПОЛУЧЕННОЙ ССЫЛКЕ
          .then((data) => {
            console.log(data.data.href);
            axios
              .put(data.data.href, file, {
                headers: {
                  Authorization:
                    "OAuth y0_AgAAAABntSSFAApE3AAAAADpHqf2tAEyA2RgQ86cNGNp5Qwa1nrRkp8",
                  "Content-Type": "application/binary",
                },
              })
              .then((result) => console.log(result));
          });
        //===================================
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  return (
    <div>
      {!userData && (
        <YandexLogin clientID={clientID} onSuccess={loginSuccess}>
          <button>Yandex Login</button>
        </YandexLogin>
      )}
      {userData && (
        <div>
          <YandexLogout onSuccess={logoutSuccess}>
            <button>Yandex Logout</button>
          </YandexLogout>
          <ul>
            <li>access_token: {userData.access_token}</li>
            <li>expires_in: {userData.expires_in}</li>
            <li>token_type: {userData.token_type}</li>
          </ul>
          <input
            type="file"
            id="fileInput"
            multiple
            onChange={(event) => setFiles(event.target.files)}
          />
          <button onClick={allowCors(uploadFiles)}>
            Загрузить файлы на диск
          </button>
        </div>
      )}
      {ready && <>ЗАГРУЗКА ЗАВЕРШЕНА</>}
      {!ready && <>ВЫБЕРИТЕ ФАЙЛЫ</>}
    </div>
  );
}

export default App;
