import React, { useEffect, useState } from 'react';
import { Row,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
// Components
import FrmCategoryButton from 'containers/forms/FrmCategoryButton';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORY, GET_BUTTON, GET_CATEGORY_BUTTON } from 'redux/contants';

const ListCategoryButtons = () => {
  const categoryButtons = useSelector((state) => state.categoryButtons);
  const categories = useSelector((state) => state.category);
  const buttons = useSelector((state) => state.buttons);
  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [from, setFrom] = useState(0);
  const [until, setUntil] = useState(0);
  const itemsPerPage = 10;
  // finish pagination

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_BUTTON });
    dispatch({ type: GET_CATEGORY });
    dispatch({ type: GET_CATEGORY_BUTTON });
    /* const Xmas95 = new Date('2023-02-19');
    const weekday = Xmas95.getDay();
    console.log(weekday); // 1 */
  }, []);

  function NewItem() {
    if (categoryButtons.addItem) {
      return (
        <>
          <FrmCategoryButton
            categoryButton={{ ...categoryButtons.newItem }}
            index=""
            isCollapse={{ collapse: true }}
            categories={categories.payload}
            buttons={buttons.allItems}
          />
        </>
      );
    }
    return <></>;
  }

  function List() {
    if (categoryButtons.allItems !== undefined) {

      let categoryButtonsList = [];
      for (let index = from; index < from+itemsPerPage ; index++) {
          if(index<(categoryButtons.allItems).length){
            categoryButtonsList.push(
                  <FrmCategoryButton
                    categoryButton={{ ...categoryButtons.allItems[index] }}
                    key={`list-category-button-item-${index}`}
                    index={index + 1}
                    isCollapse={{ collapse: false }}
                    categories={categories.payload}
                    buttons={buttons.allItems}
                  />
              )
          }
      }

      // const categoryButtonsList = categoryButtons.allItems.map(
      //   (item, index) => {
      //     return (
      //       <>
      //         <FrmCategoryButton
      //           categoryButton={{ ...item }}
      //           key={item.id}
      //           index={index + 1}
      //           isCollapse={{ collapse: false }}
      //           categories={categories.payload}
      //           buttons={buttons.allItems}
      //         />
      //       </>
      //     );
      //   }
      // );
      return categoryButtonsList;
    }
    return (
      <>
        <h1>No hay lista.</h1>
      </>
    );
  }

  
  const PaginationInPage = ()=>{
    let totalPage;
    if(categoryButtons.allItems !== undefined){
        totalPage = Math.ceil((categoryButtons.allItems).length / itemsPerPage);
        return(
            <Pagination
            size="md"
            aria-label="Page navigation example"
            listClassName="justify-content-center"
          >
            <PaginationItem>
            <PaginationLink className="first" href="#" onClick={(e)=>{
                e.preventDefault();
                setCurrentPage(1);
                setFrom(0);
                setUntil(itemsPerPage);
            }}>
                <i className="simple-icon-control-start" />
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink className="prev" href="#" 
                onClick={(e)=>{
                    e.preventDefault();
                    if(currentPage > 1){
                        setCurrentPage(currentPage-1);
                        setFrom(from-(itemsPerPage*2));
                        setFrom(from-itemsPerPage);
                    }
                }}
            >
                <i className="simple-icon-arrow-left" />
            </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
            <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink className="next" href="#"
            onClick={(e)=>{
                e.preventDefault();
                if(currentPage <totalPage){
                    setCurrentPage(currentPage+1);
                    setFrom(from+itemsPerPage);
                    setUntil(from+(itemsPerPage*2))
                }
            }}
            >
                <i className="simple-icon-arrow-right" />
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink className="last" href="#" onClick={(e)=>{
                e.preventDefault();
                setCurrentPage(totalPage);
                setFrom(((categoryButtons.allItems).length)-itemsPerPage);
                setUntil((categoryButtons.allItems).length);
            }}>
                <i className="simple-icon-control-end" />
            </PaginationLink>
            </PaginationItem>
        </Pagination>
        )
    }else{
        return(<></>);
    }
}


  return (
    <>
      <Row>
        <Colxx xxs={12}>
          <NewItem />
          <List />
          <PaginationInPage />
        </Colxx>
      </Row>
    </>
  );
};

export default ListCategoryButtons;
