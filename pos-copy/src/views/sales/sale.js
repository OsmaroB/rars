import React from 'react';
import {
    Row
} from 'reactstrap';
import { Colxx,} from 'components/common/CustomBootstrap';
// Components
import ListSales from './list-sales';

const Sale = () => {
    return(
    <>
        <Row>
            <Colxx xxs={12} className="mt-4 mb-4">
                <ListSales />
            </Colxx>
        </Row>
    </>
    );
};

export default Sale;