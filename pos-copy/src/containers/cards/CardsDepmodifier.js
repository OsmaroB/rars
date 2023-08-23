import React from "react";
import {Col} from 'reactstrap';
import FrmCardDepmodifier from "containers/forms-cards/FrmCardDepmodifier";

const CardsDepModifier = (props) => {
    
    const {
        submodifier,
        depmodifiers
    } = props;

    function Loading(){
        if(depmodifiers.allItems != null){
            const listForSubmodifier = (depmodifiers.allItems).filter((depmodifier)=>{
                return depmodifier.submodifierID == submodifier.id;
            });
            const list = listForSubmodifier.map((depmodifier)=>{
                return(
                    <Col sm={12} md={4} lg={4}>                    
                        <FrmCardDepmodifier 
                            submodifier={submodifier}
                            depmodifier={depmodifier}
                            statusCard='readonly'
                        />
                    </Col>
                );
            });
            return list;
        }
        return(<></>);
    }

    return(
        <Loading />
    );
};

export default CardsDepModifier;