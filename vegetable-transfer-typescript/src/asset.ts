/*
  SPDX-License-Identifier: Apache-2.0
*/

import { Object as DataType, Property } from 'fabric-contract-api';

@DataType()
export class Asset {
  @Property('ID', 'string')
  ID = '';

  @Property('Type', 'string')
  Type = '';

  @Property('Quantity', 'number')
  Quantity = 0;

  @Property('HarvestDate', 'string')
  HarvestDate = '';

  @Property('Owner', 'string')
  Owner = '';

  @Property('ExpirationDate', 'string')
  ExpirationDate = '';

  @Property('QualityRating', 'number')
  QualityRating = 0;

  constructor() {
    // Nothing to do
  }

  static newInstance(state: Partial<Asset> = {}): Asset {
    return {
      ID: assertHasValue(state.ID, 'Missing ID'),
      Type: state.Type ?? '',
      Quantity: state.Quantity ?? 0,
      HarvestDate: state.HarvestDate ?? '',
      Owner: assertHasValue(state.Owner, 'Missing Owner'),
      ExpirationDate: state.ExpirationDate ?? '',
      QualityRating: state.QualityRating ?? 0,
    };
  }
}

function assertHasValue<T>(value: T | undefined | null, message: string): T {
  if (value == undefined || (typeof value === 'string' && value.length === 0)) {
    throw new Error(message);
  }

  return value;
}
