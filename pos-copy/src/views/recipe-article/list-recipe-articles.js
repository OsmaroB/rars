import React,{ useEffect } from 'react';
import {
    Row
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmRecipeArticle from 'containers/forms/FrmRecipeArticle';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GET_ARTICLE, GET_RECIPE, GET_RECIPE_ARTICLE } from "redux/contants";

const ListrecipeArticles = () => {

    const recipeArticles = useSelector(state => state.recipeArticles);
    const articles = useSelector(state => state.articles);
    const recipes = useSelector(state => state.recipes);



    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: GET_ARTICLE});
        dispatch({type: GET_RECIPE});
        dispatch({type: GET_RECIPE_ARTICLE});
    },[]);

    function NewItem(){
        if(recipeArticles.addItem){
            return(<>
                <FrmRecipeArticle 
                    recipeArticle={{...recipeArticles.newItem}}
                    index=''  
                    isCollapse={{collapse: true}}
                    articles={articles.allItems}
                    recipes={recipes.allItems}
                />
            </>);
        }
        return(<></>);
    }

    function List(){
        if(recipeArticles.allItems !== undefined){
            const recipeArticlesList = (recipeArticles.allItems).map((item, index)=>{
                return(
                <>
                    <FrmRecipeArticle 
                        recipeArticle={{...item}}
                        key={item.id}
                        index={index+1}
                        isCollapse={{collapse: false}}
                        articles={articles.allItems}
                    recipes={recipes.allItems}
                    />
                </>
                )
            });
            return recipeArticlesList;
        }
        return(
            <><h1>No hay lista.</h1></>
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

export default ListrecipeArticles;