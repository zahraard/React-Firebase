import React, { Component } from "react";
import AdminLayout from "./../../../HOC/AdminLayout";
import FormFields from "./../../UI/formFields";
import { ValidData } from "../../UI/Misc";
import { firebasePlayers } from "../../../firebase";
import { firebase } from "../../../firebase";
import { firebaseDB } from "../../../firebase";
import Fileuploader from "../../UI/fileUploader";

class AddEditPlayers extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player Name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player Lastname",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player Number",
          name: "number_input",
          type: "number"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select a Position",
          name: "select_position",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showlabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    }
  };
  updateFields = (player, type, playerId, defaultImg) => {
    const newFormdata = {
      ...this.state.formdata
    };
    for (let key in newFormdata) {
      if (player) {
        newFormdata[key].value = player[key];
        newFormdata[key].valid = true;
      }
    }
    console.log(newFormdata);
    this.setState({
      playerId,
      formType: type,
      formdata: newFormdata,
      defaultImg
    });
  };
  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      //add match
      this.updateFields(false, "Add Player", playerId);
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const player = snapshot.val();

          firebase
            .storage()
            .ref("players")
            .child(player.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(player, "Edit Player", playerId, url);
            })
            .catch(e => {
              this.updateFields(
                {
                  ...player,
                  image: ""
                },
                "Edit Player",
                playerId,
                ""
              );
            });
        });
    }
  }
  updateForm = (element, content = "") => {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };
    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    const validData = ValidData(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;
    this.setState({ formError: false, formdata: newFormdata });
  };

  successForm = message => {
    this.setState({ formSuccess: message });
    setTimeout(() => {
      this.setState({ formSuccess: "" });
    }, 2000);
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === "Edit Player") {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Updated correctly");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        //add player
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  resetImage = () => {
    const newFormdata = { ...this.state.formdata };
    newFormdata["image"].value = "";
    newFormdata["image"].valid = false;
    this.setState({ defaultImg: "", formdata: newFormdata });
  };
  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };
  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <form onSubmit={this.submitForm}>
            <Fileuploader
              dir="players"
              tag={"Player image"}
              defaultImg={this.state.defaultImg}
              defaultImgName={this.state.formdata.image.value}
              resetImage={() => this.resetImage()}
              filename={filename => this.storeFilename(filename)}
            />
            <FormFields
              id={"name"}
              formdata={this.state.formdata.name}
              change={element => this.updateForm(element)}
            />
            <FormFields
              id={"lastname"}
              formdata={this.state.formdata.lastname}
              change={element => this.updateForm(element)}
            />
            <FormFields
              id={"number"}
              formdata={this.state.formdata.number}
              change={element => this.updateForm(element)}
            />
            <FormFields
              id={"position"}
              formdata={this.state.formdata.position}
              change={element => this.updateForm(element)}
            />
            <div className="success_label">{this.state.formSuccess}</div>
            {this.state.formError ? (
              <div className="error_label">Something goes wrong!!</div>
            ) : (
              ""
            )}
            <div className="admin_submit">
              <button type="submit">{this.state.formType}</button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
