import React, {useEffect} from "react";


const GlideIntento = (props) => {
    const initGlide = () => {
        glideCarousel = new Glide(carousel, {
          ...props.settings,
          direction: getDirection().direction,
        });
        glideCarousel.mount();
        glideCarousel.on('resize', onResize);
        mountTimeOut = setTimeout(() => {
          const event = document.createEvent('HTMLEvents');
          event.initEvent('resize', false, false);
          window.dispatchEvent(event);
        }, 500);
    };

    useEffect(() => {
        initGlide();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
      }, []);

    return(
        <>
        <div>
            {/* eslint-disable-next-line no-return-assign */}
            <div className="glide">
                <div data-glide-el="track" className="glide__track">
                {/* eslint-disable-next-line react/destructuring-assignment */}
                <div className="glide__slides">
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                </div>
                </div> 
            </div>
        </div>
        </>
    )
};

GlideComponent.defaultProps = {
    settings: {},
  };
  
GlideComponent.propTypes = {
settings: PropTypes.shape({
    type: PropTypes.string,
    startAt: PropTypes.number,
    perView: PropTypes.number,
    focusAt: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    gap: PropTypes.number,
    autoplay: PropTypes.bool,
    hoverpause: PropTypes.bool,
    keyboard: PropTypes.bool,
    bound: PropTypes.bool,
    swipeThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
    dragThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
    perTouch: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
    touchRatio: PropTypes.number,
    touchAngle: PropTypes.number,
    animationDuration: PropTypes.number,
    rewind: PropTypes.bool,
    rewindDuration: PropTypes.number,
    animationTimingFunc: PropTypes.string,
    direction: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    peek: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    breakpoints: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object,
    throttle: PropTypes.number,
}),
// id: PropTypes.string,
// className: PropTypes.string,
};

export default GlideIntento;