declare namespace API {


  type AddressVO = {
    /** 地址唯一ID */
    addressId?: number;
    /** 收货人姓名 */
    recipientName?: string;
    /** 收货人电话 */
    recipientPhone?: string;
    /** 收货人省份 */
    province?: string;
    /** 收货人城市 */
    city?: string;
    /** 收货人详细地址 */
    address?: string;
  };


  type fileUploadParams = {
    /** 上传的主题的编码,比如商品详细图片,用户头像 */
    subjectCode: string;
  };


  type getOrderDetailByIdParams = {
    orderId: string;
  };


  type IPageOrderVO = {
    size?: number;
    current?: number;
    records?: OrderVO[];
    total?: number;
    pages?: number;
  };

  type LoginUserPO = {
    /** 登录名 */
    username: string;
    /** 登录密码 */
    password: string;
  };

  type LoginUserVO = {
    /** 访问令牌 */
    accessToken?: string;
    /** 刷新令牌 */
    refreshToken?: string;
    user?: UserVO;
  };

  type OrderDetailVO = {
    /** 订单详细信息ID */
    detailId?: number;
    /** 订单ID */
    orderId?: number;
    product?: ProductVO;
    /** 对应商品的下单数量 */
    quantity?: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type OrderVO = {
    /** 订单ID */
    orderId?: number;
    /** 订单的状态 */
    orderStatus?: number;
    /** 订单的总金额 */
    totalAmount?: number;
    /** 订单的创建时间 */
    createTime?: string;
    user?: UserVO;
    address?: AddressVO;
  };

  type PageProductBrandVO = {
    records?: ProductBrandVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageProductBrandVO;
    searchCount?: PageProductBrandVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageProductColorVO = {
    records?: ProductColorVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageProductColorVO;
    searchCount?: PageProductColorVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageProductSizeVO = {
    records?: ProductSizeVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageProductSizeVO;
    searchCount?: PageProductSizeVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageProductTypeVO = {
    records?: ProductTypeVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageProductTypeVO;
    searchCount?: PageProductTypeVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageProductVO = {
    records?: ProductVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageProductVO;
    searchCount?: PageProductVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };


  type pageQueryBrandParams = {
    /** 每页的大小 */
    pageSize?: string;
    /** 当前的页码 */
    currentPage: string;
  };

  type pageQueryColorParams = {
    /** 每页的大小 */
    pageSize?: string;
    /** 当前的页码 */
    currentPage: string;
  };


  type pageQueryOrderParams = {
    /** 当前查询的页码 */
    currentPage: string;
    /** 页的大小 */
    pageSize?: string;
    /** 订单的状态 */
    orderStatus?: string;
  };

  type pageQueryParams = {
    /** 当前的页码 */
    currentPage: string;
    /** 每页的大小 */
    pageSize?: string;
  };

  type pageQuerySizeParams = {
    /** 每页的大小 */
    pageSize?: string;
    /** 当前的页码 */
    currentPage: string;
  };

  type pageQueryTypeParams = {
    /** 每页的大小 */
    pageSize?: string;
    /** 当前的页码 */
    currentPage: string;
  };


  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserVO;
    searchCount?: PageUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type ProductBrandVO = {
    /** 品牌Id */
    brandId?: number;
    /** 品牌名 */
    brandName?: string;
    /** 品牌状态 0--未入驻 1--入驻 默认入驻 */
    isEnable?: number;
    /** 品牌记录创建时间 即入驻时间 */
    createTime?: string;
    /** 品牌的Logo */
    brandLogoUrl?: string;
  };

  type ProductColorVO = {
    /** 颜色Id */
    colorId?: number;
    /** 颜色名 */
    colorName?: string;
    /** 颜色状态 0--未入驻 1--入驻 默认入驻 */
    isEnable?: number;
    /** 颜色记录创建时间 即入驻时间 */
    createTime?: string;
  };

  type ProductSizeVO = {
    /** 尺寸Id */
    sizeId?: number;
    /** 尺寸名 */
    sizeName?: string;
    /** 尺寸状态 0--未入驻 1--入驻 默认入驻 */
    isEnable?: number;
    /** 尺寸记录创建时间 即入驻时间 */
    createTime?: string;
  };

  type ProductTypeVO = {
    /** 类型Id */
    typeId?: string;
    /** 类型名 */
    typeName?: string;
    /** 类型状态 0--未入驻 1--入驻 默认入驻 */
    isEnable?: number;
    /** 类型记录创建时间 即入驻时间 */
    createTime?: string;
  };

  type ProductVO = {
    /** 商品ID */
    productId?: number;
    /** 商品姓名 */
    name?: string;
    /** 商品的图片链接列表 */
    detailImgUrls?: string;
    /** 商品的价格 */
    price?: number;
    brand?: ProductBrandVO;
    type?: ProductTypeVO;
    color?: ProductColorVO;
    size?: ProductSizeVO;
    /** 商品的库存 */
    inventory?: number;
    /** 商品的上架状态 1--上架 0--未上架 */
    isEnable?: number;
  };

  type refreshParams = {
    refreshToken: string;
  };

  type RegisterUserPO = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 邮箱 */
    email?: string;
  };


  type RespListOrderVO = {
    code?: number;
    message?: string;
    data?: OrderVO[];
  };

  type RespOrderVO = {
    code: number;
    message: string;
    data?: OrderVO;
  };

  type RespIPageOrderVO = {
    code?: number;
    message?: string;
    data?: IPageOrderVO;
  };

  type RespListOrderDetailVO = {
    code?: number;
    message?: string;
    data?: OrderDetailVO[];
  };

  type RespListProductBrandVO = {
    code?: number;
    message?: string;
    data?: ProductBrandVO[];
  };

  type RespListProductColorVO = {
    code?: number;
    message?: string;
    data?: ProductColorVO[];
  };

  type RespListProductSizeVO = {
    code?: number;
    message?: string;
    data?: ProductSizeVO[];
  };

  type RespListProductTypeVO = {
    code?: number;
    message?: string;
    data?: ProductTypeVO[];
  };

  type RespListAddressVO = {
    code?: number;
    message?: string;
    data?: AddressVO[];
  };

  type RespLoginUserVO = {
    code?: number;
    message?: string;
    data?: LoginUserVO;
  };

  type RespObject = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type RespProductVO = {
    code?: number;
    message?: string;
    data?: ProductVO;
  };

  type RespPageProductBrandVO = {
    code?: number;
    message?: string;
    data?: PageProductBrandVO;
  };

  type RespPageProductColorVO = {
    code?: number;
    message?: string;
    data?: PageProductColorVO;
  };

  type RespPageProductSizeVO = {
    code?: number;
    message?: string;
    data?: PageProductSizeVO;
  };

  type RespPageProductTypeVO = {
    code?: number;
    message?: string;
    data?: PageProductTypeVO;
  };

  type RespPageProductVO = {
    code?: number;
    message?: string;
    data?: PageProductVO;
  };


  type RespString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type RespTokenEntity = {
    code?: number;
    message?: string;
    data?: TokenEntity;
  };

  type RespUserVO = {
    code?: number;
    message?: string;
    data?: UserVO;
  };

  type TokenEntity = {
    accessToken?: string;
    refreshToken?: string;
  };


  type UpdateUserPO = {
    /** 用户ID 不可修改 */
    userId: number;
    /** 用户名 */
    username?: string;
    /** 用户电子邮件 */
    email?: string;
    /** 用户角色 */
    role?: number;
    /** 头像链接 */
    avatarUrl?: string;
    /** 用户状态  0--未封号 1--已封号 */
    isEnable?: number;
  };

  type UserVO = {
    /** 用户ID */
    userId?: number;
    /** 用户姓名 */
    username?: string;
    /** 用户邮箱地址 */
    email?: string;
    /** 用户的角色 0--普通用户  1--管理员用户 */
    role?: number;
    /** 用户头像地址 */
    avatarUrl?: string;
    /** 用户是否封号 0--未封号 1--封号 */
    isEnable?: number;
  };

  interface AddAddressPO {
    userId: number;
    recipientName: string;
    recipientPhone: string;
    province: string;
    city: string;
    address: string;
  }

  interface DeleteAddressPO {
    addressId: string;
    userId: string;
  }

  interface UpdateAddressPO {
    addressId: string;
    userId: string;
    recipientName: string;
    recipientPhone: string;
    province: string;
    city: string;
    address: string;
  }


  interface PageQueryProductPO {
    currentPage: number;
    pageSize?: number;
    name?: string;
    brandId?: string;
    typeId?: string;
    colorId?: string;
    sizeId?: string;
  }


  interface OrderDetailPO {
    /** 商品ID */
    productId: string;
    /** 商品数量 */
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }

  interface AddOrderPO {
    /** 用户ID */
    userId: string;
    /** 地址ID */
    addressId: string;
    /** 应付金额 */
    totalAmount: number;
    /** 订单明细 */
    details: OrderDetailPO[];
  }

  interface UpdatePasswordPO {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
    /** 重复的新密码 */
    confirmPassword: string;
  }


}
