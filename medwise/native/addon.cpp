#include <napi.h>

Napi::String GetMedicineInfo(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Paracetamol: 500mg");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("getMedicineInfo", Napi::Function::New(env, GetMedicineInfo));
  return exports;
}

NODE_API_MODULE(addon, Init)