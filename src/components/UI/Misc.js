import React from "react";

import { Link } from "react-router-dom";

export const Tag = props => {
  const template = (
    <div
      style={{
        background: props.bck,
        color: props.color,
        fontSize: props.size,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.link}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = snapshot => {
  let data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export const revereseArray = actualArray => {
  let reveresedArray = [];
  for (let i = actualArray.length - 1; i >= 0; i--) {
    reveresedArray.push(actualArray[i]);
  }
  return reveresedArray;
};

export const ValidData = element => {
  let error = [true, ""];
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "must be a valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "this field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  return error;
};
