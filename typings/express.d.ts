/**
 * IMPORTANT - do not use imports in this file!
 * It will break global definition.
 */

/// <reference path='./../node_modules/mongoose/index.d.ts' />

declare namespace Express {
  interface Request {
    // Scopes
    isTV?: Boolean;
    isGame?: Boolean;
    isMobile?: Boolean;
    isOculus?: Boolean;

    // Session
    userAge?: Number;
    uId?: _ObjectId;
    sid?: String;
    role?: Number;
    uAgeParam?: Number /* 0 | 13 | 18 */;
    token?: String;
    has2FA?: Boolean;
  }

  interface Response {}
}
