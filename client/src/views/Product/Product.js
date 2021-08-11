import React, { useEffect,useState } from "react";
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
import CustomSelect from "components/CustomSelect/CustomSelect";

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

var arrCaterogy = [];
var arrProvider = [];

const useStyles = makeStyles(styles);

export default function Product() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  
  const [dateProd, setDateProd] = useState(null);




  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");

  
  const classes = useStyles();

  

  useEffect(() => {

    if(isAuthenticated){
    getAccessTokenSilently()
      .then((accessToken) => {
        return fetch("http://localhost:3001/category", {
          
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      })
      .then(r =>  {return r.json()})
      .then(obj => {
        arrCaterogy = obj.map((d) => Object({val:d.id, text: d.name}));
      })
      .catch((err) => {
        alert(err);
      });;

      getAccessTokenSilently()
      .then((accessToken) => {
        return fetch("http://localhost:3001/provider", {
          
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      })
      .then(r =>  {return r.json()})
      .then(obj => {
        arrProvider = obj.map((d) => Object({val:d.id, text: d.name}));
      })
      .catch((err) => {
        alert(err);
      });
    }

    
  }, [getAccessTokenSilently]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //TODO: validacao dos componentes
    var data = {
      name:name,
      categoryId: category,
      providerId: provider,
      quantity:quantity,
      price:price,
      date_in:dateProd,
      comment:info
    }

    setOpen(true);

    getAccessTokenSilently()
      .then((accessToken) => {
        return fetch("http://localhost:3001/product", {
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
      });;
  }

  const handleChangeCategoty = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeProvider = (event) => {
    setProvider(event.target.value);
  };

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
                <h4 className={classes.cardTitleWhite}>Adicionar Produto</h4>
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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomSelect
                      labelText="Categoria"
                      id="categ"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      valueSelect={category}
                      onChange={handleChangeCategoty}
                      objectArrays={arrCaterogy}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                  <CustomSelect
                      labelText="Fornecedor"
                      id="fornec"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      valueSelect={provider}
                      onChange={handleChangeProvider}
                      objectArrays={arrProvider}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Preço"
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChange={(evt) => setPrice(evt.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Quantidade"
                      id="cel"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChange={(evt) => {
                        setQuantity(evt.target.value);
                      }}
                      inputProps={{value: quantity}}
                      typeInput="number"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Data"
                      id="dateProduct"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChange={(evt) => setDateProd(evt.target.value)}
                      typeInput="date"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Comentário</InputLabel>
                    <CustomInput
                      labelText="Informação sobre o fornecedor"
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                      onChange={(evt) => setInfo(evt.target.value)}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">Adicionar Produto</Button>
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
