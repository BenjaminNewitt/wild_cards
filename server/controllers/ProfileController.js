import _profileService from "../services/ProfileService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class ProfilesController {
  constructor() {
    //edit is behind authorize, get is not
    this.router = express
      .Router()
      .get("/:id", this.getById)
      .use(Authorize.authenticated)
      .put("/:id", this.edit)
      .use(this.defaultRoute);
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getById(req, res, next) {
    try {
      //more standard get by id
      let data = await _profileService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      //basic verified edit
      let data = await _profileService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
