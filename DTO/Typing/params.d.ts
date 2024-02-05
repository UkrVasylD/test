declare namespace Params {
  export type defaultMarketplaceMailParamsDTO = {
    email: string | string[];
    templateId?: string;
    status?: string;
    type?: 'audio' | 'video' | 'image';
    salePrice?: number;
    name?: string;
    tokenId?: number;
    imageKey?: string;
  };
}
