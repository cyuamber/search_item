import AF from '../../states/actionFactory';
const Service = {};

Service.get_weather = AF.getFetch(
    { url: 'http://tj.nineton.cn/Heart/index/all' }, 'getweather'
);

export default Service;