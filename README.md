# `Matster`

Online food store. All goods can be sorted by name or price. By default, all goods prices are displayed in USD but can be converted to EUR or SEK by the latest rate of exchange. All goods can be added to the basket page - /basket. All user's navigation is recorded to the logs page - /logs.

Deployed to Heroku: https://matster.herokuapp.com. Deployment to Heroku is triggered each time a new commit is pushed to the main branch. 

## Technologies and libraries used: 

 - Server - [Node](https://nodejs.org), [Express](https://expressjs.com)
 - Data is stored on server filesystem in JSON files
 - Client Framework - [React](https://reactjs.org), [Redux](https://redux.js.org)
 - Styles - [Tailwind CSS](https://tailwindcss.com)
 - 3rd party API used - [Exchange Rate](https://exchangeratesapi.io)

## Architecture: 
<img src="./docs/ReadmeImages/ArchitectureDiagram.png" title="Architecture Diagram">

## Implementation specifics: 
- Logs are stored in the filesystem and the file size isn’t limited.
- One image used for all goods.
- User management is out of scope, the application works in “single user mode”.
- Payment and orders are not implemented.

## Planned Improvements:
- Pagination.
- Limit logs file size.

## Main interaction scenarios as GIFs:
<img src="./docs/ReadmeImages/AddingGoodsToBasket.gif" title="Adding Goods To Basket">
<img src="./docs/ReadmeImages/SortingGoods.gif" title="Sorting Goods">

## Screenshots:

### Desktop (macOS, Chrome):

<p float="left">
  <img src="./docs/ReadmeImages/Basket.png" width="49%" height="450" title="Basket">
  <img src="./docs/ReadmeImages/Logs.png" width="49%" height="450" title="Logs">

</p>
<p float="left">
  <img src="./docs/ReadmeImages/AllGoodsSmallResolution.png" width="49%" title="All Goods Small Resolution">
  <img src="./docs/ReadmeImages/AllGoodMediumResolution.png" title="All Goods Medium Resolution"/> 
  <img src="./docs/ReadmeImages/AllGoodsHighResolution.png" title="All Goods High Resolution"/>
</p>


### Mobile (iOS, Chrome):
<p float="left">
  <img src="./docs/ReadmeImages/AllGoodsMobile.jpg" height="600" title="All Goods"/>
  <img src="./docs/ReadmeImages/BasketMobile.jpg" height="600" title="Basket"/> 
</p>

