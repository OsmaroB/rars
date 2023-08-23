import { adminRoot } from './defaultValues';
import {
  readCashDeskPending,
} from 'apis/cash-desk-closing';
import { isValidElement } from 'react';


let menuData;


const validCutX = async () =>{
  if(localStorage.getItem('idcashdesk')){
    return false;
  }
  return true;
}

if(localStorage.getItem('roleDetail') != undefined && localStorage.getItem('roleID')){
  const roleDetailData = JSON.parse(localStorage.getItem('roleDetail'));
  const roleID = localStorage.getItem('roleID');
  const filterRoutesForRole = roleDetailData.filter((roleDetail)=>{
    return roleDetail.roleID == roleID
  })

  let subsGenerals = [];
  let subsPeoples = [];
  let subsPermission = [];
  let subsProducts = [];
  let subsButtons = [];
  let subsCut = [];
  let outputCashDesk =[];
  filterRoutesForRole.map(async(route)=>{
    // general routes
    if(route.url == '/app/cut-output-cash'){
      outputCashDesk.push({
        icon: 'iconsminds-cash-register-2',
        label: 'menu.cut-output-cash',
        to: `${adminRoot}/cut-output-cash`,
      })
    }
    if(route.url == '/app/category'){
      subsGenerals.push({
        icon: 'simple-icon-tag',
        label: 'menu.category',
        to: `${adminRoot}/category`,
      })
    }
    if(route.url == '/app/channel'){
      subsGenerals.push({
        icon: 'iconsminds-shop-3',
        label: 'menu.channel',
        to: `${adminRoot}/channel`,
      })
    }
    if(route.url == '/app/tiket-configuration'){
      subsGenerals.push({
        icon: 'simple-icon-settings',
        label: 'menu.tiket-configuration',
        to: `${adminRoot}/tiket-configuration`,
      })
    }
    if(route.url == '/app/payment-methods'){
      subsGenerals.push({
        icon: 'simple-icon-credit-card',
        label: 'menu.payment-methods',
        to: `${adminRoot}/payment-methods`,
      })
    }
    // if(route.url == '/app/restaurants'){
    //   subsGenerals.push({
    //     icon: 'iconsminds-shop-3',
    //     label: 'menu.restaurants',
    //     to: `${adminRoot}/restaurants`,
    //   })
    // }
    if(route.url == '/app/document-type'){
      subsGenerals.push({
        icon: 'simple-icon-doc',
        label: 'menu.document-type',
        to: `${adminRoot}/document-type`,
      })
    }
    if(route.url == '/app/discounts'){
      subsGenerals.push({
        icon: 'iconsminds-calculator',
        label: 'menu.discounts',
        to: `${adminRoot}/discounts`,
      })
    }
    if(route.url == '/app/documents'){
      subsGenerals.push({
        icon: 'iconsminds-calculator',
        label: 'menu.documents',
        to: `${adminRoot}/documents`,
      })
    }
    // people section
    if(route.url == '/app/employee'){
      subsPeoples.push({
        icon: 'simple-icon-user',
        label: 'menu.employee',
        to: `${adminRoot}/employee`,
      })
    }
    if(route.url == '/app/users'){
      subsPeoples.push({
        icon: 'simple-icon-user-follow',
        label: 'menu.users',
        to: `${adminRoot}/users`,
      })
    }
    if(route.url == '/app/customers'){
      subsPeoples.push({
        icon: 'simple-icon-people',
        label: 'menu.customers',
        to: `${adminRoot}/customers`,
      })
    }
    if(route.url == '/app/codes'){
      subsPeoples.push({
        icon: 'iconsminds-id-card',
        label: 'menu.codes',
        to: `${adminRoot}/codes`,
      })
    }
    // permission section
    if(route.url == '/app/role'){
      subsPermission.push({
        icon: 'iconsminds-firewall',
        label: 'menu.role',
        to: `${adminRoot}/role`,
      })
    }
    if(route.url == '/app/role-detail'){
      subsPermission.push({
        icon: 'iconsminds-lock-2',
        label: 'menu.role-detail',
        to: `${adminRoot}/role-detail`,
      })
    }
    // products section
    // if(route.url == '/app/gifcards'){
    //   subsProducts.push({
    //     icon: 'simple-icon-present',
    //     label: 'menu.gifcards',
    //     to: `${adminRoot}/gifcards`,
    //   })
    // }
    if(route.url == '/app/modifier'){
      subsProducts.push({
        icon: 'iconsminds-coffee-to-go',
        label: 'menu.modifier',
        to: `${adminRoot}/modifier`,
      })
    }
    if(route.url == '/app/article'){
      subsProducts.push({
        icon: 'iconsminds-coffee-to-go',
        label: 'menu.article',
        to: `${adminRoot}/article`,
      })
    }
    if(route.url == '/app/recipe'){
      subsProducts.push({
        icon: 'iconsminds-chef-hat',
        label: 'menu.recipe',
        to: `${adminRoot}/recipe`,
      })
    }
    if(route.url == '/app/recipe-article'){
      subsProducts.push({
        icon: 'iconsminds-chef-hat',
        label: 'menu.recipe-article',
        to: `${adminRoot}/recipe-article`,
      })
    }
    if(route.url == '/app/product'){
      subsProducts.push({
        icon: 'iconsminds-bread',
        label: 'menu.product',
        to: `${adminRoot}/product`,
      })
    }
    if(route.url == '/app/product-detail'){
      subsProducts.push({
        icon: 'iconsminds-bread',
        label: 'menu.product-detail',
        to: `${adminRoot}/product-detail`,
      })
    }
    if(route.url == '/app/optional'){
      subsProducts.push({
        icon: 'iconsminds-cheese',
        label: 'menu.optional',
        to: `${adminRoot}/optional`,
      })
    }
    if(route.url == '/app/optional-product'){
      subsProducts.push({
        icon: 'iconsminds-cheese',
        label: 'menu.optional-product',
        to: `${adminRoot}/optional-product`,
      })
    }
    // button section
    if(route.url == '/app/button'){
      subsButtons.push({
        icon: 'simple-icon-control-play',
        label: 'menu.button',
        to: `${adminRoot}/button`,
      })
    }
    if(route.url == '/app/button-detail'){
      subsButtons.push({
        icon: 'simple-icon-layers',
        label: 'menu.button-detail',
        to: `${adminRoot}/button-detail`,
      })
    }
    if(route.url == '/app/prices'){
      subsButtons.push({
        icon: 'iconsminds-dollar',
        label: 'menu.price',
        to: `${adminRoot}/prices`,
      })
    }
    if(route.url == '/app/category-button'){
      subsButtons.push({
        icon: 'simple-icon-docs',
        label: 'menu.category-button',
        to: `${adminRoot}/category-button`,
      })
    }
    // cut section
    if(route.url == '/app/cut-x'){
      subsCut.push({
        icon: 'iconsminds-money-bag',
        label: 'menu.cut-x',
        to: `${adminRoot}/cut-x`,
      })
    }
    if(route.url == '/app/sales'){
      subsCut.push({
        icon: 'iconsminds-money-bag',
        label: 'Ventas',
        to: `${adminRoot}/sales`,
      })
    }
    if(route.url == '/app/cut-z'){
      if(!localStorage.getItem('idcashdesk')){
        subsCut.push({
          icon: 'iconsminds-dollar',
          label: 'menu.cut-z',
          to: `${adminRoot}/cut-z`,
        })
      }
    }
  });

  menuData = [];
  if(subsGenerals.length > 0){
    menuData.push(
      {
        id: 'generals',
        icon: 'simple-icon-tag',
        label: 'menu.generals',
        to: `${adminRoot}/category`,
        subs:subsGenerals,
      },
    )
  }
  if(subsPeoples.length > 0){
    menuData.push(
      {
        id: 'people',
        icon: 'simple-icon-user',
        label: 'menu.people',
        to: `${adminRoot}/people`,
        subs: subsPeoples,
      },
    )
  }
  if(subsPermission.length > 0){
    menuData.push(
      {
        id: 'permissions',
        icon: 'iconsminds-firewall',
        label: 'menu.permissions',
        to: `${adminRoot}/permissions`,
        subs: subsPermission,
      },
    )
  }
  if(subsProducts.length > 0){
    menuData.push(
      {
        id: 'products',
        icon: 'iconsminds-chef-hat',
        label: 'menu.products',
        to: `${adminRoot}/products`,
        subs: subsProducts
      },
    )
  }
  if(subsButtons.length > 0){
    menuData.push(
      {
        id: 'buttons',
        icon: 'simple-icon-control-play',
        label: 'menu.buttons',
        to: `${adminRoot}/buttons`,
        subs:subsButtons,
      },
    )
  }
  if(outputCashDesk.length > 0){
    menuData.push({
      icon: 'iconsminds-cash-register-2',
      label: 'menu.cut-output-cash',
      to: `${adminRoot}/cut-output-cash`,
    })
  }
  if(subsCut.length > 0){
    menuData.push(
      {
        id: 'cuts',
        icon: 'iconsminds-money-bag',
        label: 'menu.cut',
        to: `${adminRoot}/cut`,
        subs:subsCut,
      },
    )
  }
  menuData.push(
    {
      id: 'customer-sale',
      icon: 'simple-icon-basket-loaded',
      label: 'menu.customer-sales',
      to: `${adminRoot}/customer-sales`,
    },
  );
}

export default menuData;
