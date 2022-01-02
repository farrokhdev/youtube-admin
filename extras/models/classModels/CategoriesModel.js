import { makeObservable } from 'mobx'
import React, { Component } from 'react'
import MainModel from './MainModel'

export default class CategoriesModel extends MainModel {
  id = ''
  title = ''
  icon = ''

  constructor() {
    super()
    makeObservable(this)
  }
}
