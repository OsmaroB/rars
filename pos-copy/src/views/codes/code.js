import { Colxx } from "components/common/CustomBootstrap";
import React from "react"
import { Button, ButtonGroup, Row } from "reactstrap";
import ListCodes from "./list-codes";
const Code = () => {
    return(
        <>
        <Row>
            <Colxx xxs={12} className="mt-4 mb-4">
                <ListCodes />
            </Colxx>
        </Row>
        </>
    )
}
export default Code;