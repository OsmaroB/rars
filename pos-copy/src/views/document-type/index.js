import React from "react";
import { 
    Row, 
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import components
import Token from "containers/token/Token";
import SrchDocumentType from "containers/searchs/SrchDocumentType";
import DocumentTypes from "./document-types";

const DocumentType = ({match}) => {
    return(
      <>
      <Token />
      <Row>
        <Colxx xxs="9">
          <Row key="row1">
            <Colxx xxs="12">
              <Breadcrumb heading="" match={match} />
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row key="row2">
            <Colxx xss="12">
              <Row>
                <Colxx xxs="12">
                  <DocumentTypes />
                </Colxx>
              </Row>
            </Colxx>
          </Row>
        </Colxx>
        <Colxx xxs="3">
          <h1>Buscador</h1>
          <SrchDocumentType />
        </Colxx>
      </Row>
    </>
  );
};

export default DocumentType;