import { Context } from 'egg';

/**
 * Make common format response.
 * @param ctx Request context
 * @param code Response code
 * @param msg Response msg (Short description for this response)
 * @param data Response data
 */
function makeCommonResponse(ctx:Context, code:number, msg:string, data:any = {}):CommonResponse {
  const body = {
    code,
    msg,
    data,
  };
  ctx.body = body;
  return body;
}

export default {
  makeCommonResponse,
};
