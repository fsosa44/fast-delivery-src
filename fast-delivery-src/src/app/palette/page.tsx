"use client";
import React, { useState } from "react";
import "@/styles/buttons.css";
import "@/styles/input.css";
import InputEmail from "@/commons/InputEmail";
import InputText from "@/commons/InputText";
import InputPassword from "@/commons/InputPassword";
import CircularProgresss from "@/commons/CircularProgresss";

function Palette() {
  const [form, setForm] = useState({
    inputText: "",
    InputEmail: "",
    InputPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        className="greenButton"
        style={{ display: "flex", margin: "1rem auto 1rem" }}
      >
        Green Button
      </button>
      <button
        className="transparentButton1"
        style={{ display: "flex", margin: "1rem auto 1rem" }}
      >
        Transparent Button 1
      </button>
      <div
        style={{
          backgroundColor: "white",
          height: "4rem",
          width: "fit-content",
          padding: "1rem",
          display: "flex",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <button className="transparentButton2">Transparent Button 2</button>
        <button className="link2">Link 2</button>
      </div>
      <button
        className="link1"
        style={{ display: "flex", margin: "1rem auto 1rem" }}
      >
        Link 1
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          margin: "0 auto 1rem",
          padding: "1rem",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InputEmail
          className="inputWhite"
          placeholder="InputEmail white"
          name="inputWhite"
          disabled={false}
          onChange={handleChange}
          value={form.InputEmail}
        />
        <InputText
          className="inputWhite"
          placeholder="InputText white"
          name="inputWhite"
          disabled={false}
          onChange={handleChange}
          value={form.inputText}
        />
        <InputPassword
          className="inputWhite"
          placeholder="InputPassword white"
          name="inputWhite"
          disabled={false}
          onChange={handleChange}
          value={form.InputPassword}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          margin: "0 auto 1rem",
          padding: "1rem",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="input-container">
          <span className="icon-container">{/* <UserIcon /> */}</span>
          <InputEmail
            className="inputBlue"
            placeholder="InputEmail blue"
            name="inputWhite"
            disabled={false}
            onChange={handleChange}
            value={form.InputEmail}
          />
        </div>

        <InputText
          className="inputBlue"
          placeholder="InputText blue"
          name="inputWhite"
          disabled={false}
          onChange={handleChange}
          value={form.inputText}
        />
        <div className="input-container">
          <span className="icon-container">{/* <PswIcon /> */}</span>
          <InputPassword
            className="inputBlue"
            placeholder="InputPassword blue"
            name="inputWhite"
            disabled={false}
            onChange={handleChange}
            value={form.InputPassword}
          />
        </div>
        <CircularProgresss percentage={65} />
      </div>
    </div>
  );
}

export default Palette;
