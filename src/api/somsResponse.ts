interface ApiResultBase {
    success: boolean;
    code: string;
    message: string;
  }
  
  interface ApiSuccess<T> {
    result: ApiResultBase & { success: true };
    data: T;
  }
  
  interface ApiFail {
    result: ApiResultBase & { success: false };
    data: null;
  }
  
  export type SomsResponse<T> = ApiSuccess<T> | ApiFail;
  