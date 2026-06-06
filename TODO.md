- [ ] Update Joi schemas in `middleware/validate.js` to match the fields used by `routes.rest` and the Mongoose models (user: age/phone/address, item: category/stock/brand/rating/description).
- [ ] Remove/ignore client-sent `createdAt` from validation (let Mongoose timestamps set it).
- [ ] Re-test failing requests in `routes.rest` for users and items.
- [ ] Commit the fix (optional, depending on whether you want it pushed to Render).

