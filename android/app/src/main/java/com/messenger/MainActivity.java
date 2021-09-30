package com.messenger;

import com.facebook.react.ReactActivity;

import android.content.res.Configuration;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Messenger";
  }

  /**
   * For React Native Screens
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  /**
   * For using Appearance in React Native
   */
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);
      getReactInstanceManager().onConfigurationChanged(this, newConfig);
  }
}
