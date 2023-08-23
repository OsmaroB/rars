import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrchRecipeArticle from "containers/searchs/SrchRecipeArticle";
import RecipeArticles from "./recipe-articles";

const RecipeArticle = ({match}) => {
    return(
      <>
      <Token />
      <Row key="row1">
        <Colxx xxs="12">
          <Breadcrumb heading="menu.recipe-article" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row key="row2">
        <Colxx xss="12">
          <Row>
            <Colxx xxs="9">
              <RecipeArticles />
            </Colxx>
            <Colxx xxs="3">
              <SrchRecipeArticle />
            </Colxx>
          </Row>
        </Colxx>

      </Row>
    </>
  );
};

export default RecipeArticle;