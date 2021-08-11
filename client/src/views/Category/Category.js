import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SimpleModal from "components/Alert/alert.js"

import { useAuth0 } from "@auth0/auth0-react";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function Category() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;

  const [userMetadata, setUserMetadata] = useState(null);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  const [tel, setTel] = useState("");
  const [telPatter, setTelPatter] = useState(false);
  
  
  const [per, setPer] = useState("");
  const [perPatter, setPerPatter] = useState(false);

  
  const classes = useStyles();

  // if (isAuthenticated) {
  //   getAccessTokenSilently().then((value) => console.log(value));
  // }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(name == null || name == ""){
      alert("Nome precisa ser preenchido")
      return
    }

    //TODO: validacao dos componentes
    var data = {
      name:name
    }

    setOpen(true);

    getAccessTokenSilently()
      .then((accessToken) => {
        return fetch("http://localhost:3001/category", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      })
      .then(r =>  r.json().then(data => ({status: r.status, body: data})))
      .then(obj => {
        setOpen(false);
        var textReturn = obj.status == 200 ? "Dados Salvo com sucesso" : `Erro: ${obj.body}`;
        alert(textReturn);
      })
      .catch((err) => {
        setOpen(false);
        alert(err);
      });
  }

  if (!isAuthenticated) {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody textAlign='center'>
                <h4 >Faça o Login Primeiramente</h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Adicionar Categoria</h4>
                {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Nome"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChange={(evt) => setName(evt.target.value)}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">Adicionar Categoria</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <SimpleModal
          open={open}
          textLabel="Processando"
          />
      </div>
    </form>
  );
}
