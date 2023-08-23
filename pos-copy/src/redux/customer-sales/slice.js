import { createSlice } from '@reduxjs/toolkit';
import voidsOrders from 'helpers/updateOrders';

const customerSales = createSlice({
    name: 'customerSales',
    initialState:{
        allItems: [],
        filter: '',
        allPrices:[],
        orderData:{
            id:'',
            name:'',
        },
        searchKeyword: '',
        seachItems:[],
        loading: false,
        newItem:{
            id:'',
            mask:'',
            name:'',
            status: 0,
            userCreate: '',
            userUpdate: '',
        },
        channelSelectedID: 2,
        channelSelectedName: 'Restaurante',
        subchannelSelectedID:0,
        subchannelSelectedName:'',
        isChannel: true,
        addItem: false,
        categorySelectedID: '1',
        categorySelectedName: '',
        subCategorySelectedID: '1',
        subcategorySelectedName: '',
        subcategorySelected: '',
        isCategory: true,
        modifierModal: false,
        modifierSelected: '',
        stepModifier:1,
        modifier:'',
        submodifierListSelected:'',
        depModifierListSelected:'',
        productSelectedID:'',
        productSelectedName:'',
        modifierSelectedID:'',
        submodifierSelectedID:'',
        depmodifierSelectedID:'',
        priceSelected:'',
        level:0,
        orders:[],
        order:[],
        description:'',
        orderSelected:0,
        productOrderSelected:0,
        identifierProductSelected:'',
        clientModal: false,
        documentModal: false,
        documentSelected: '',
        customerSelected: '',
        documentTypeSelected:'',
        paymentMethodDetailSelected:'',
        paymentMethodSelected:'',
        cutX:'',
        total:0.00,
        discounts:0.00,
        statusChangueOrder:'',
        ordersModal:false,
        disccountsModal:false,
        changeSale:0,
        statusSidebar:false,
        isProductModifierClick:false,
        discountSubchannel:0.00,
    },
    reducers:{
        setStatusSidebarSlice:(state,action)=>{
            return{
                ...state,
                statusSidebar:action.payload.status,
            }
        },
        setDiscountSubchannelSlice:(state,action)=>{
            return{
                ...state,
                discountSubchannel:action.payload.discountSubchannel,
            }
        },
        setIsProductModifierClickSlice:(state,action)=>{
            console.log(action);
            return{
                ...state,
                isProductModifierClick:action.payload.status
            }
        },
        getPricesForChannelCategorySlice:(state,action)=>{
            return{
                ...state,
                allPrices:action.payload,
            }
        },

        setCleanSelectedDetailSlice:(state,action)=>{
            return{
                ...state,
                documentSelected:'',
                paymentMethodDetailSelected:'',
                paymentMethodSelected:'',
            }
        },

        setOrderSelectedSlice:(state,action)=>{
            return{
                ...state,
                orderSelected:action.payload.orderSelected,
            }
        },

        setOrderModalSlice:(state,action)=>{
            return{
                ...state,
                ordersModal:action.payload.status,
            }
        },

        setDiscountsModalSlice:(state,action)=>{
            return{
                ...state,
                disccountsModal:action.payload.status,
            }
        },

        setStatusChangueOrderSlice:(state,action)=>{
            const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            const identifier = genRanHex(10);
            return{
                ...state,
                statusChangueOrder:identifier,
                action,
            }
        },

        setDescriptionSlice:(state,action)=>{
            return {
                ...state,
                action,
                description:action.payload.description
            }
        },

        setClientModalSlice:(state,action)=>{
            return{
                ...state,
                clientModal:action.payload.status,
                action
            }
        },

        getCashDeskClosingForDateCashDeskStatusSlice:(state,action)=>{
            return{
                ...state,
                cutX: (action.payload)[0],
                action
            }
        },

        setPaymentMethodSlice:(state,action)=>{
            return{
                ...state,
                paymentMethodSelected:action.payload.paymentMethod,
            }
        },

        setPaymentMethodDetailSelectedSlice:(state,action)=>{
            return{
                ...state,
                paymentMethodDetailSelected: action.payload.paymentMethodDetail,
            }
        },

        setDocumentSlice:(state,action)=>{
            return{
                ...state,
                documentSelected:action.payload.document,
            }
        },  

        setDocumentTypeSlice:(state,action)=>{
            return{
                ...state,
                documentTypeSelected:action.payload.documentType,
                action
            }
        },

        setCustomerSlice:(state,action)=>{
            return{
                ...state,
                customerSelected:action.payload.customer,
            }
        },

        setDocumentModalSlice: (state,action) => {
            return{
                ...state,
                documentModal: action.payload.status,
                action
            }
        },

        getCustomerSalesSlice: (state, action) => {
            return {
                ...state,
                allItems: action.payload,
                Items: action.payload,
            }
        },

        getAllCustomerSlice:(state, action)=>{
            return{
                ...state,
                action,
            }
        },

        setLevelCustomerSaleSlice:(state,action)=>{
            return{
                ...state,
                level: action.payload.level,
            }
        },

        setModifierSelectedIDCustomerSaleSlice:(state,action)=>{
            return{
                ...state,
                modifierSelectedID:action.payload.modifierID
            }
        },
        setSubModifSelectedIDCustomerSalesSlice:(state,action)=>{
            return{
                ...state,
                submodifierSelectedID:action.payload.submodifierID
            }
        },
        setDepModiSelectedIDCustomerSalesSlice:(state,action)=>{
            return{
                ...state,
                depmodifierSelectedID:action.payload.depmodifierID
            }
        },
        setProductCustomerSalesSlice:(state,action)=>{
            return{
                ...state,
                productSelectedID: action.payload.product.id,
                productSelectedName: action.payload.product.name,
            }
        },
        setIdentifierProductSelectedSlice:(state,action)=>{
            return{
                ...state,
                identifierProductSelected: action.payload.identifier,
                action
            }
        },
        changeChannelSlice: (state, action)=>{
            return {
                ...state,
                channelSelectedName: action.payload.channel.name,
                channelSelectedID: action.payload.channel.id,
                subchannelSelectedID: '',
                subchannelSelectedName: '',
                isChannel: true,
            }
        },
        changeSubChannelSlice: (state, action)=>{
            return {
                ...state,
                channelSelectedName: `${action.payload.channel.name} - ${action.payload.changueChannel.name}`,
                channelSelectedID: action.payload.channel.id,
                subchannelSelectedID: action.payload.changueChannel.id,
                subchannelSelectedName: action.payload.changueChannel.name,
                isChannel: false
            }
        },
        getChannelSlice:(state,action) => {
            categorySelectedID:state.categorySelectedID;
            // catego
            // return{
                // ...state,
            // }
        },
        customerSalesGetChannelSlice:(state, action)=>{
            return {
                ...state,
                action
            }
        },
        changeSubCategoryCustomerSalesSlice:(state, action)=>{
            return{
                ...state,
                action,
                subcategorySelected: action.payload.subcategories,
                isCategory: action.payload.isCategory,
            }
        },
        changeStatusModifierModalSlice:(state, action)=>{
            return{
                ...state,
                action,
                modifierModal: action.payload.status
            }
        },
        chageModifierSelectedSlice:(state, action)=>{
            return{
                ...state,
                action,
                modifierSelected: action.payload.modifier
            }
        },
        getModifierProductForIdSlice: (state, action) => {
            try {
                return{
                    ...state,
                    modifier: action.payload.modifierProduct,
                }
            } catch (error) {
                console.log(error);
            }
        },

        changeModifierStepSlice:(state, action) => {
            return{
                ...state,
                stepModifier: action.payload.step,
            }
        },

        addDetailModifier:(state, action) => {
            return{
                ...state,
                action
            }
        },

        setSubmodifierListCustomerSalesSlice:(state, action) => {
            return{
                ...state,
                submodifierListSelected: action.payload.submodifiers
            }
        },

        setCategoryCustomerSalesSlice:(state,action) => {
            return{
                ...state,
                categorySelectedID: action.payload.category.id,
                categorySelectedName:action.payload.category.name
            }
        },
        setOrderSlice:(state,action) => {
            console.log('orderslice')
            return{
                ...state,
                order:action.payload.order,
                total:action.payload.total,
                discounts:action.payload.discounts,
            }
        },

        addOrderCustomerSalesSlice:(state,action)=>{
            try {
                const orders = action.payload.orders;
                const newOrder = [];
                const products = [];
                const channel = action.payload.channel;
                const subchannel = action.payload.subchannel;
                let total = 0.00;
                let discounts = 0.00;
                const price = action.payload.price;
                const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                const identifier = genRanHex(6);
                const newData = {
                    id:price.buttonDetail.product.id,
                    identifier:identifier,
                    productID:price.buttonDetail.product.id,
                    name:price.buttonDetail.product.name,
                    mask:price.buttonDetail.product.mask,
                    description:'',
                    cant:1,
                    discount:price.discount,
                    cost:price.price,
                    priceID:price.id,
                    priceArray:price,
                    modifierProduct:[{...action.payload.modifierProduct, cantModifier:1}],
                }
                
                let cantElement = 1;
                products.push(newData);
                orders.map((order)=>{
                    newOrder.push(order)
                });
                newOrder.push(products);
                localStorage.setItem('orders', JSON.stringify(newOrder));
                localStorage.setItem('ordersChannel', JSON.stringify([{channel,subchannel}]));
                total = (voidsOrders.total(products)).total;
                discounts = (voidsOrders.total(products)).discounts;
                return{
                    ...state,
                    order:products,
                    total:total,
                    identifierProductSelected:newData.identifier,
                    discounts:discounts,
                }
            } catch (error) {
                return{
                    state,
                    action
                }
            }
        },

        addModifierProductCustomerSalesSlice:(state,action)=>{
            try {
                const order = action.payload.order;
                const channel = action.payload.channel;
                const subchannel = action.payload.subchannel;
                const deleteModifier = action.payload.deleteModifier;
                let modifierProduct = action.payload.modifierProduct;
                const identifierProductSelected = action.payload.identifierProductSelected;
                const price = action.payload.price;
                const newOrder = [];
                const product = modifierProduct.product;
                const newModifierProduct = [];
                let total = 0;
                let discounts = 0;
                // 1- Insert all products in newOrder
                order.map((product)=>{
                    newOrder.push(product);
                });
                const productSelected = (order).filter((product)=>{
                    return product.identifier == identifierProductSelected;
                })
                if(productSelected.length > 0){
                    // read all modifiers in ProductSelected
                    const modifiers = ((productSelected[0]).modifierProduct).map((modifier)=>{
                        // asign cant modifier and plus in 1 to 1
                        if(modifier.modifierID == modifierProduct.modifierID){
                            let n;
                            // n = modifier?.cantModifier+1;
                            if(deleteModifier && modifier?.cantModifier > 0){
                                n = modifier?.cantModifier-1;
                            }else if(!deleteModifier){
                                n = modifier?.cantModifier+1;
                            }
                            modifierProduct = {...modifier,cantModifier:n}
                            return{...modifier,cantModifier:n}
                        }
                        return modifier
                    });

                    
                    const filterModifier = modifiers.filter((modifier)=>{
                        return modifier.modifierID != modifierProduct.modifierID
                    });
                    
                    // Asign cantModifier id not exist
                    if(modifierProduct?.cantModifier == null){
                        modifierProduct = {...modifierProduct,cantModifier:1}
                    }
                    
                    // push filterModifier in newModifierProduct
                    filterModifier.map((modifier)=>{
                        newModifierProduct.push(modifier);
                    })
                    // add modifierProduct in newModifierProduct
                    if(modifierProduct?.cantModifier > 0){
                        newModifierProduct.push(modifierProduct);
                    }

                    // modeling newProduct list
                    const newProduct = {
                        ...product,
                        identifier:identifierProductSelected,
                        modifierProduct: newModifierProduct,
                        cant:1,
                        description:'', 
                        price:price.price,
                        priceID:price.id,
                        priceArray:price,
                        cost:price.price,
                        productID:product.id
                    };
                    const newDataOrder = newOrder.filter((product)=>{
                        return product.identifier != identifierProductSelected
                    })
                    
                    // add newProduct 
                    newDataOrder.sort(function(a, b) {
                        let nameA = a.identifier.toUpperCase();
                        let nameB = b.identifier.toUpperCase();
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                    });

                    newDataOrder.push(newProduct);
                    // order the newOrderList
                    total = (voidsOrders.total(newDataOrder)).total;
                    discounts = (voidsOrders.total(newDataOrder)).discounts;
                    voidsOrders.updateOrders(action.payload.orderSelected, newDataOrder,channel,subchannel);
                    return{
                        ...state,
                        order: newDataOrder,
                        total,
                        discounts
                    }
                }
                return{
                    ...state,
                    action
                }
            } catch (error) {
                console.log(error);
            }
        },

        updateModifierProductCustomerSalesSlice:(state,action)=>{
            
            return{
                ...state,
                action
            }
        },

        deleteModifierProductCustomerSalesSlice:(state,action)=>{
            
            return{
                ...state,
                action
            }
        },

        addProductCustomerSalesSlice:(state,action)=>{
            try {
                let total = 0.00;
                let discounts = 0.00;
                const typeAdd = action.payload.typeAdd;
                const order = action.payload.order;
                const price = action.payload.price;
                const channel = action.payload.channel;
                const subchannel = action.payload.subchannel;
                const modifierProduct = {...action.payload.modifierProduct,cantModifier:1};
                // const modifierProduct = action.payload.modifierProduct;
                const product = action.payload.price.buttonDetail.product;
                const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                const identifier = genRanHex(6);
                
                let newOrder = [];
                const newData = {
                    id:product.id,
                    mask:product.mask,
                    productID: product.id,
                    identifier:identifier,
                    name: product.name,
                    description:'',
                    cant:1,
                    discount:price.discount,
                    cost:price.price,
                    priceID:price.id,
                    priceArray:price,
                    modifierProduct:[modifierProduct],
                    typeAdd,
                }
                // full new Order With products in order
                let cantProduct = 1;
                order.map((product)=>{
                    if(newData.id == product.id && product.modifierProduct[0]?.id == null && product?.typeAdd != 'notModifier'){
                        cantProduct = product.cant + cantProduct;
                    }
                    newOrder.push(product);
                });

                newOrder.sort(function(a, b) {
                    let nameA = a.identifier.toUpperCase();
                    let nameB = b.identifier.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                });

                if(cantProduct > 1){
                    newOrder = newOrder.filter((product)=>{
                        return product.id != newData.id
                    })
                    newOrder.push({
                            ...newData,
                            cant:cantProduct
                        });
                }else{
                    newOrder.push(newData);
                }
                
                voidsOrders.updateOrders(action.payload.orderSelected,newOrder,channel,subchannel);
                total = (voidsOrders.total(newOrder)).total;
                discounts = (voidsOrders.total(newOrder)).discounts;
                return{
                    ...state,
                    order:newOrder,
                    action,
                    identifierProductSelected:newData.identifier,
                    total,
                    discounts,
                    changeSale:genRanHex(8)
                }
            } catch (error) {
                console.log(error)
            }
        },

        updateProductCustomerSalesSlice:(state,action)=>{
            try {
                const order = action.payload.order;
                const product = action.payload.product;
                const qty = action.payload.qty;
                const description = action.payload.description;
                const indexProduct = action.payload.indexProduct;
                const newOrder=[];
                const productExact = {
                    ...product,
                    cant:qty,
                    description:description
                };
                // foll new Order With products in order
                order.map((product)=>{
                    newOrder.push(product);
                })
                newOrder.splice(indexProduct,1);
                newOrder.sort(function(a, b) {
                    let nameA = a.identifier.toUpperCase();
                    let nameB = b.identifier.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                });
                
                newOrder.push(productExact);
                let total = (voidsOrders.total(newOrder)).total;
                let discounts = (voidsOrders.total(newOrder)).discounts;
                return{
                    ...state,
                    order: newOrder,
                    action,
                    total,
                    discounts,
                }
            } catch (error) {
                console.log(error);
            }
        },

        deleteProductCustomerSalesSlice:(state,action)=>{
            try {
                let total = 0.00;
                let discounts = 0.00;
                const order = action.payload.order;
                const newOrder = [];
                const indexProduct = action.payload.indexProduct;
                let cant;
                // foll new Order With products in order
                order.map((product)=>{
                    newOrder.push(product);
                })
                cant = newOrder[indexProduct].cant;
                if(cant > 1){
                    const newData = {
                        ...newOrder[indexProduct],
                        cant: cant -1
                    }
                    newOrder[indexProduct] = newData;
                }else{
                    if(indexProduct == 0){
                        newOrder.shift();
                    }else{
                        newOrder.splice(indexProduct,1);
                    }
                }

                total = (voidsOrders.total(newOrder)).total;
                discounts = (voidsOrders.total(newOrder)).discounts;
                voidsOrders.updateOrders(action.payload.orderSelected, newOrder);
                return{
                    ...state,
                    order:newOrder,
                    action,
                    total,
                    discounts
                }
            } catch (error) {
                console.log(error);
            }
        },
        // sin finalizar
        updateOrderCustomerSalesSlice:(state,action)=>{
            const orderSelected = action.payload.orderSelected;
            return{
                ...state,
                action
            }
        },

        deleteOrderCustomerSalesSlice:(state,action)=>{

        },

        setPriceSelectedCustomerSalesSlice:(state,action)=>{
            return{
                ...state,
                priceSelected: action.payload.price,
            }
        },
        setsearchItems:(state, action) =>{
            const filter = (action.payload.filter).toLowerCase();
            return{
                ...state,
                filter,
            } 
        },
        setOrderDataSlice:(state,action) =>{
            const orderData = action.payload.orderData;
            return{
                ...state,
                orderData,
            }
        }
    }
})

export const { 
    getCustomerSalesSlice,
    changeChannelSlice,
    customerSalesGetChannelSlice,
    changeSubChannelSlice,
    changeSubCategoryCustomerSalesSlice,
    getAllCustomerSlice,
    changeStatusModifierModalSlice,
    chageModifierSelectedSlice,
    getModifierProductForIdSlice,
    changeModifierStepSlice,
    setSubmodifierListCustomerSalesSlice,
    setCategoryCustomerSalesSlice,
    setProductCustomerSalesSlice,
    setLevelCustomerSaleSlice,
    setModifierSelectedIDCustomerSaleSlice,
    setSubModifSelectedIDCustomerSalesSlice,
    setDepModiSelectedIDCustomerSalesSlice,
    addOrderCustomerSalesSlice,
    setPriceSelectedCustomerSalesSlice,
    addProductCustomerSalesSlice,
    deleteProductCustomerSalesSlice,
    updateProductCustomerSalesSlice,
    setIdentifierProductSelectedSlice,
    addModifierProductCustomerSalesSlice,
    setClientModalSlice,
    setDocumentModalSlice,
    setDocumentSlice,
    setCustomerSlice,
    setDocumentTypeSlice,
    setPaymentMethodDetailSelectedSlice,
    setPaymentMethodSlice,
    getCashDeskClosingForDateCashDeskStatusSlice,
    setOrderSlice,
    setStatusChangueOrderSlice,
    setOrderModalSlice,
    setOrderSelectedSlice,
    setDiscountsModalSlice,
    setCleanSelectedDetailSlice,
    getChannelSlice,
    setStatusSidebarSlice,
    getPricesForChannelCategorySlice,
    setDescriptionSlice,
    setClientSlice,
    setsearchItems,
    setOrderDataSlice,
    setIsProductModifierClickSlice,
    setDiscountSubchannelSlice,
 } = customerSales.actions;
export default customerSales.reducer