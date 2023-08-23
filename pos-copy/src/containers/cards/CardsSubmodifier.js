import React from "react";
import {Col} from 'reactstrap';
import FrmCardSubmodifier from "containers/forms-cards/FrmCardSubmodifier";

const CardSubModifier = (props) => {
    
    const {
        modifier,
        submodifiers
    } = props;

    function Loading(){
        if(submodifiers.allItems != null){
            const listForModifier = (submodifiers.allItems).filter((submodifier)=>{
                return submodifier.modifierID == modifier.id;
            });
            const list = listForModifier.map((submodifier)=>{
                return(
                    <Col sm={12} md={4} lg={4}>                    
                        <FrmCardSubmodifier 
                            modifier={modifier}
                            submodifier={submodifier}
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

export default CardSubModifier;