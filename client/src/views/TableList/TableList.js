import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { useAuth0 } from "@auth0/auth0-react";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

var arrCaterogy = [];
var arrProvider = [];
var arrProduct = [];

export default function TableList() {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [isLoadingProvider, setIsLoadingProvider] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);


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
      .then(r => { return r.json() })
      .then(obj => {
        arrCaterogy = obj.map((d) => [d.name]);
        setIsLoadingCategory(false);
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
      .then(r => { return r.json() })
      .then(obj => {
        arrProvider = obj.map((d) => [d.name, d.cel, d.info, d.per_price]);
        setIsLoadingProvider(false);
      })
      .catch((err) => {
        alert(err);
      });;

    getAccessTokenSilently()
      .then((accessToken) => {
        return fetch("http://localhost:3001/productTable", {

          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      })
      .then(r => { return r.json() })
      .then(obj => {
        arrProduct = obj.map((d) => [d.name
          , d.Category.name
          , d.Provider.name
          ,`R$ ${(d.price).toString().replace(".",",")}`
          ,`R$ ${(d.price*d.quantity).toString().replace(".",",")}`
          ,`R$ ${(d.Provider.per_price*d.price*d.quantity).toString().replace(".",",")}`
          ,`R$ ${((1 - d.Provider.per_price)*d.price*d.quantity).toString().replace(".",",")}`
          ,d.quantity
          , new Date(d.date_in).toLocaleDateString()
          ,d.comment
          ]);

        setIsLoadingProduct(false);
      })
      .catch((err) => {
        alert(err);
      });
    }

  }, [getAccessTokenSilently]);

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
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Tabela dos Produtos</h4>
            <p className={classes.cardCategoryWhite}>
              Tabela que informa todos os produtos do usuário
            </p>
          </CardHeader>
          <CardBody>
            {isLoadingProduct ? (
              <h4 >Carregando...</h4>
            ) : (
              <Table
                tableHeaderColor="primary"
                tableHead={["Nome"
                  , "Categoria"
                  , "Fornecedor"
                  , "Valor (R$)"
                  , "Valor Total(R$)"
                  , "Total do Fornecedor (R$)"
                  , "Lucro(R$)"
                  , "Quantidade"
                  , "Data de Entrada"
                  , "Comentário"
                  ]}
                tableData={arrProduct}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Tabela das Categorias</h4>
            <p className={classes.cardCategoryWhite}>
              Tabela que informa todos as categorias criadas pelo usuário
            </p>
          </CardHeader>
          <CardBody>
            {isLoadingCategory ? (
              <h4 >Carregando...</h4>
            ) : (
              <Table
                tableHeaderColor="primary"
                tableHead={["Nome"]}
                tableData={arrCaterogy}
              />
            )}

          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Tabela dos Fornecedores</h4>
            <p className={classes.cardCategoryWhite}>
              Tabela que informa todos os fornecedores adicionados pelo usuário
            </p>
          </CardHeader>
          <CardBody>
            {isLoadingProvider ? (
              <h4 >Carregando...</h4>
            ) : (
              <Table
                tableHeaderColor="primary"
                tableHead={["Nome", "Telefone", "Informação", "Porcentagem"]}
                tableData={arrProvider}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
