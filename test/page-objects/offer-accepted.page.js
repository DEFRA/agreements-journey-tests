import { Page } from './page.js'

class OfferAcceptedPage extends Page {
  async getConfirmationText() {
    return await $(`.govuk-panel__title`).getText()
  }

  async getStartDateText() {
    return await $('.govuk-panel__body').getText()
  }

  async getReferenceNumber() {
    return await $('p.govuk-body').getText()
  }

  // Generic helper for links by partial text
  async getLinkByPartialText(text) {
    return await $(`a*=${text}`)
  }

  async getAgreementDocumentLink() {
    return await this.getLinkByPartialText('agreement document')
  }

  async getTermsAndConditionsLink() {
    return await this.getLinkByPartialText(
      'technical test terms and conditions'
    )
  }

  async getTechnicalTestInfoLink() {
    return await this.getLinkByPartialText('technical test information')
  }

  async getWoodlandManagementPlanLink() {
    return await this.getLinkByPartialText(
      'Capital grants agreements: terms and conditions 2026'
    )
  }

  async getTechnicalTestActionsLink() {
    return await this.getLinkByPartialText('technical test actions')
  }

  async clickAgreementDocumentLink() {
    const link = await this.getAgreementDocumentLink()
    await link.click()
  }

  async getGuidanceLink() {
    return await this.getLinkByPartialText('Read the guidance')
  }

  async getHelpText() {
    const details = await $('summary=If you need help')
    const parent = await details.parentElement()
    return parent.$('.govuk-details__text').getText()
  }

  async toggleHelpText() {
    return await $('summary=If you need help').click()
  }

  async getCallChargesLink() {
    return await this.getLinkByPartialText('Find out about call charges')
  }

  // SSI and HEFER
  async getInstructionPanelText() {
    const panels = await $$('.govuk-panel__body')
    return await panels[1].getText()
  }

  // Dynamic heading locator based on text content
  async getSectionHeading(headingText) {
    return await $(`h2=${headingText}`)
  }

  // Link locators
  async getHeferGuidanceLink() {
    return await $('a*=historic or archaeological features')
  }

  async getHeferGuidanceLinkwithSSI() {
    return await $('a*=Historic Environment Farm Environment Record')
  }

  async getSssiGuidanceLink() {
    return await $('a*=SSSI consent')
  }

  async getIfYouNeedHelpHeading() {
    const heading = await $('h2=If you need help')

    return heading.getText()
  }
}

export { OfferAcceptedPage }
