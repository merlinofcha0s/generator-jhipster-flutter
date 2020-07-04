import 'dart:async';

class ValidatorMixin {
  final validateLogin =
      StreamTransformer<String, String>.fromHandlers(handleData: (login, sink) {
    int min = 3;
    if (login.length >= min) {
      sink.add(login);
    } else {
      sink.addError('The login has to contain more than $min');
    }
  });

  final validateEmail =
      StreamTransformer<String, String>.fromHandlers(handleData: (email, sink) {
    if (email.contains('@')) {
      sink.add(email);
    } else {
      sink.addError('Please enter a valid address email');
    }
  });

  final validatePassword = StreamTransformer<String, String>.fromHandlers(
      handleData: (password, sink) {
    int min = 4;
    if (password.length >= min) {
      sink.add(password);
    } else {
      sink.addError('The password has to contain more than $min');
    }
  });


  final validateTermsAndCondition = StreamTransformer<bool, bool>.fromHandlers(
      handleData: (agree, sink) {
        if (agree) {
          sink.add(agree);
        } else {
          sink.addError('Please accept the terms and conditions');
        }
      });

  final validateName = StreamTransformer<String, String>.fromHandlers(handleData: (name, sink) {
        int max = 50;
        if (name == null || (name != null && name.length <= 50)) {
          sink.add(name);
        } else {
          sink.addError('The firstname has to be less than $max characters');
        }
  });

}
