import React, { Component } from 'react'

class InventoryPage extends Component {
    render() {
        return (
            false && <h1>Inventory Page</h1>
        )
    }
}

export default InventoryPage;

/*
- On this page admin should see list of items which are currently available, and marked as deleted.
    Products component can be used. 
    What about additional features available only for admin?
        - Admin buttons can be coded as component and added to the view



  - Each item he should see item type, name, price, number in stock, button to edit, button to remove (only for items that are not removed)
- Admin should be able to edit each existing item by clicking "Edit" button which opens/redirects to the form filled with item data. Then he should be able to change all the item properties.
- He should be able to remove items
  - if someone bought them, they should be still visible in the "Orders" and "Cart" page
  - removed items should not be displayed in the "Shop" page
- Admin should be able to add new items to our inventory.
  - There should be a button "Add new item" which opens/redirects to the form where he can specify all properties of the item
 */