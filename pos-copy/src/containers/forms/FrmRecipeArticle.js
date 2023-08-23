import React, {useState} from "react";
import { 
    Card,
    Button,
    Collapse,
    Form,
    FormGroup,
    Label,
    Row,
    Input
 } from 'reactstrap';
 import { successMessage } from 'helpers/messages'
 import { useDispatch } from "react-redux";
 import { Colxx } from 'components/common/CustomBootstrap';
 import Select from 'react-select';
 import CustomSelectInput from 'components/common/CustomSelectInput';
import { 
    ADD_RECIPE_ARTICLE,
    CLOSE_FORM_RECIPE_ARTICLE,
    REMOVE_RECIPE_ARTICLE,
    UPDATE_RECIPE_ARTICLE
} from "redux/contants";
import Swal from "sweetalert2";
import validation from "containers/validations/ValidationProductDetail";
import Cookies from 'universal-cookie';

const FrmRecipeArticle = (props)=>{

    const {recipeArticle, recipes, articles} = props;
    const {index} = props;
    const {isCollapse} = props;
    const [collapse, setCollapse] = useState(isCollapse.collapse);
    const [add, setAdd] = useState(true);
    // 
    const [quantity, setQuantity] = useState(recipeArticle.quantity);
    const [recipeName, setRecipeName] = useState(recipeArticle.recipe.name);
    const [recipeID, setRecipeID] = useState(recipeArticle.recipe.id);
    const [articleName, setArticleName] = useState(recipeArticle.article.name);
    const [articleID, setArticleID] = useState(recipeArticle.article.id);

    const selectRecipes = () => {
        if(recipes !== undefined){
            const res = recipes.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const selectArticles = () => {
        if(articles !== undefined){
            const res = articles.map((item)=>{
                return{label: item.name, value: item.name, key:item.id};
            })
            return res;
        }
        return{label: '', value:'', key:''}
    };

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [userID] = useState(cookies.get('userID')); 

    const updateClick = () => {
        const newData = {
            ...recipeArticle, 
            quantity,
            recipeID,
            articleID,
            recipeName,
            articleName,
            userUpdate:userID,
            recipe:{
                name:recipeName
            },
            article:{
                name:articleName
            },
        }
        if(validation.update(newData)){
            dispatch({type: UPDATE_RECIPE_ARTICLE, recipeArticle: newData});
            successMessage('Envio de datos exitoso', 'El item a sido actualizado con exito');
            dispatch({type: CLOSE_FORM_RECIPE_ARTICLE});
        }
    };

    const addClick = () => {
        const newData = {
            ...recipeArticle, 
            quantity,
            recipeID,
            articleID,
            recipeName,
            articleName,
            recipe:{
                name:recipeName
            },
            article:{
                name:articleName
            },
            userCreate:userID
        }
        if(validation.add({newData})){
            dispatch({type: ADD_RECIPE_ARTICLE, recipeArticle: newData});
            successMessage('Envio de datos exitoso', 'El item a sido guardado con exito');
            setAdd(!add);
            dispatch({type: CLOSE_FORM_RECIPE_ARTICLE});
        }
    };

    const removeFinish = (newStatus) => {
        const newData = {...recipeArticle, status:newStatus};
        dispatch({type: REMOVE_RECIPE_ARTICLE, recipeArticle: newData});
        successMessage('Envio de datos exitoso', newStatus ? 'El item a sido reingresado con exito': 'El item a sido eliminado con exito');
    };

    const removeClick = () => {
        const newStatus = recipeArticle.status === 0 ? 1 : 0;
        if(newStatus === 1){
            Swal.fire({
                title: 'Estás seguro de eliminar este item',
                text: "Permanecera oculto hasta que vuelva a integrarlo a la aplicación",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si deseo eliminarlo'
            }).then((result) => {
                if (result.isConfirmed) {
                    removeFinish(newStatus);
                }
            })
        }else{
            removeFinish(newStatus);
        }
    };

    return(
        <>
            <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                    <div className="card-body aling-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero aling-items-md-center">
                        <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                            <span className="heading-number d-inline-block mt-2 mb-2">
                                {index}
                            </span>
                            <h3><b>Receta: {recipeArticle.recipe.name}</b></h3>
                            <h3>Artículo: {recipeArticle.article.name}</h3>
                            <h4>Cantidad: {recipeArticle.quantity}</h4>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <Button
                            outline
                            color={recipeArticle.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1 view-button no-border"
                        >
                            <i className="simple-icon-eye" />
                        </Button>

                        <Button
                            outline
                            color={recipeArticle.status === 0 ? 'theme-3' : 'light'}
                            className={`icon-button ml-1 rotate-icon-click ${
                            collapse ? 'rotate' : ''
                            }`}
                            onClick={() => {
                                setCollapse(!collapse);
                                setAdd(!add);
                            }}
                        >
                            <i className="simple-icon-arrow-down" />
                        </Button>
                        <Button
                            outline
                            color={recipeArticle.status === 0 ? 'theme-3' : 'light'}
                            className="icon-button ml-1"
                            onClick={() => {removeClick()}}
                        >
                            <i className={recipeArticle.status === 0 ? 'simple-icon-ban' : 'simple-icon-check'} />
                        </Button>
                    </div>
                </div>
                <Collapse isOpen={collapse}>
                    <div className="card-body pt-0">
                        <div className="edit-mode">
                            <Form>
                                <FormGroup>
                                    <Row>
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Cantidad</Label>
                                                <Input
                                                    type="text"
                                                    className="rounded"
                                                    placeholder="Agregar la cantidad"
                                                    value={quantity}
                                                    onChange={(e)=>{setQuantity(e.target.value)}}
                                                />
                                            </div>
                                            <div className="mt-3 mb-3">
                                                <Label>Receta</Label>
                                                <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select rounded"
                                                classNamePrefix="react-select"
                                                name="form-field-name"
                                                defaultValue={{label:recipeName, value:recipeID}}
                                                onChange={(e)=>{
                                                    console.log(e.key);
                                                    console.log(e.value);
                                                    setRecipeID(e.key);
                                                    setRecipeName(e.value);
                                                }}
                                                options={selectRecipes()}
                                                />
                                            </div>
                                        </Colxx>
                                        <Colxx xxs={12} xs={12} md={6} lg={6}>
                                            <div className="mt-3 mb-3">
                                                <Label>Artículo</Label>
                                                <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select rounded"
                                                classNamePrefix="react-select"
                                                name="form-field-name"
                                                defaultValue={{label:articleName, value:articleID}}
                                                onChange={(e)=>{
                                                    setArticleID(e.key);
                                                    setArticleName(e.value);
                                                }}
                                                options={selectArticles()}
                                                />
                                            </div>
                                        </Colxx>
                                    </Row>
                                    <div className="text-right">
                                        <Button
                                            outline
                                            color="primary"
                                            className="m-1"
                                            onClick={() => {dispatch({type: CLOSE_FORM_RECIPE_ARTICLE})}}
                                        >
                                            <i className="simple-icon-close btn-group-icon" /> Cancelar
                                        </Button>
                                        <Button
                                            // outline
                                            color="primary"
                                            className="m-1"
                                            onClick={()=>{
                                                if(add){
                                                    addClick();
                                                }else{
                                                    updateClick();
                                                }
                                            }}
                                        >
                                            <i className="simple-icon-plus btn-group-icon" /> Guardar
                                        </Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </Collapse>
            </Card>
        </>    
    );
};

export default FrmRecipeArticle;