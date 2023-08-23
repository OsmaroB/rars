/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import Breadcrumb from 'containers/navs/Breadcrumb';
// import IntlMessages from 'helpers/IntlMessages';
// import { items } from 'data/carouselItems';
import GlideComponent from 'components/carousel/GlideComponent';


const NoControlCarouselItem = () => {
  const title = 'Titulo';
  const img = 'img';
  const detail = 'detail';
  return (
    <div className="glide-item">
      <Card>
        <div className="position-relative">
          <img className="card-img-top" src={img} alt={title} />
        </div>
        <CardBody>
          <h6 className="mb-4">{title}</h6>
          <footer>
            <p className="text-muted text-small mb-0 font-weight-light">
              {detail}
            </p>
          </footer>
        </CardBody>
      </Card>
    </div>
  );
};
  
const CarouselExample = () => {
   return(
      <Row>
          <Colxx xxs="12">
            <CardTitle>
                Titulo j
            </CardTitle>
          </Colxx>
          <Colxx xxs="12" className="pl-0 pr-0 mb-5">
            <GlideComponent
                settings={{
                gap: 5,
                perView: 4,
                type: 'carousel',
                breakpoints: {
                    480: { perView: 1 },
                    800: { perView: 2 },
                    1200: { perView: 3 }, 
                },
                hideNav: true,
                }}
            >
              <NoControlCarouselItem />
              <NoControlCarouselItem />
              <NoControlCarouselItem />
              <NoControlCarouselItem />
              <NoControlCarouselItem />
            </GlideComponent>
          </Colxx>
      </Row>
    );
};

  export default CarouselExample;