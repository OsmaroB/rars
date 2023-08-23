import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CATEGORY, GET_SUBCATEGORY } from "redux/contants";
import FrmSubCategory from 'containers/forms/FrmSubCategory'
import { Row, } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";

const ListSubCategories = () =>{

    const subcategories = useSelector(state => state.subcategories);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category);

    useEffect(()=>{
        dispatch({type: GET_SUBCATEGORY});
        dispatch({type: GET_CATEGORY})
    },[])

    function NewItem(){
        if(subcategories.addItem){
            return(<>
                <FrmSubCategory 
                subcategory={{...subcategories.newItem, collapse: true}}
                index=''  
                categories={categories.allCategoriesItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(subcategories.allItems !== undefined){
            const subcategoryList = (subcategories.allItems).map((item, index)=>{
                return(
                <>
                    <FrmSubCategory 
                        subcategory={{...item, collapse:false}}
                        key={item.id}
                        index={index+1}
                        categories={categories.allCategoriesItems}
                    />
                </>
                )
            });
            return subcategoryList;
        }
        return(
            <><h1>No hay subcategorías.</h1></>
        )
    };

    return(
    <>
        <Row>
            <Colxx xxs={12}>
                <NewItem />
                <List />
            </Colxx>
        </Row>
    </>
    );
};

export default ListSubCategories;