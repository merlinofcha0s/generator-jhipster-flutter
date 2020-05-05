import 'package:dart_json_mapper/dart_json_mapper.dart';

void configMapper() {
//  JsonMapper().useAdapter(JsonMapperAdapter(valueDecorators: {
//    typeOf<List<Question>>(): (value) => value.cast<Question>(),
//    typeOf<Set<Question>>(): (value) => value.cast<Question>(),
//    typeOf<List<Answer>>(): (value) => value.cast<Answer>(),
//    typeOf<Set<Answer>>(): (value) => value.cast<Answer>(),
//    typeOf<List<UserPack>>(): (value) => value.cast<UserPack>(),
//    typeOf<Set<UserPack>>(): (value) => value.cast<UserPack>(),
//    typeOf<List<CardDTO>>(): (value) => value.cast<CardDTO>(),
//    typeOf<Set<CardDTO>>(): (value) => value.cast<CardDTO>(),
//    typeOf<List<Pack>>(): (value) => value.cast<Pack>(),
//    typeOf<Set<Pack>>(): (value) => value.cast<Pack>()
//  }, converters: {
//    PackState: EnumConverter(PackState.values),
//    PackType: EnumConverter(PackType.values),
//    ValueType: EnumConverter(ValueType.values),
//    SortingType: EnumConverter(SortingType.values),
//    ResultStep : EnumConverter(ResultStep.values),
//  }));
}

class EnumConverter implements ICustomConverter<dynamic> {
  List<dynamic> compareTO;

  EnumConverter(List<dynamic> compareTO) : super() {
    this.compareTO = compareTO;
  }

  @override
  dynamic fromJSON(jsonValue, [JsonProperty jsonProperty]) {
    String jsonValueString = jsonValue.toString().replaceAll('"', '');
    var result;
    if (jsonValueString.indexOf('.') != - 1) {
      result = compareTO.firstWhere((v) => jsonValueString == v.toString(), orElse: () => null);
    } else {
      result =  compareTO.firstWhere((v) => jsonValueString == v.toString().split('.').last, orElse: () => null);
    }
    return result;
  }

  @override
  String toJSON(dynamic object, [JsonProperty jsonProperty]) {
    if(object != null){
      return object.toString().split('.').last;
    } else {
      return '';
    }
  }
}
