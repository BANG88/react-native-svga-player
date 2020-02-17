package bang.svga.player;

import android.content.Context;
import android.view.View;

import androidx.appcompat.widget.AppCompatCheckBox;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.opensource.svgaplayer.SVGAImageView;
import com.opensource.svgaplayer.SVGAParser;
import com.opensource.svgaplayer.SVGAVideoEntity;

import java.net.URL;


import static android.provider.ContactsContract.CommonDataKinds.Website.URL;

public class RNSvgaPlayerManager extends SimpleViewManager<RCTSVGAImageView> {

    public static final String REACT_CLASS = "RNSvgaPlayer";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RCTSVGAImageView createViewInstance(ThemedReactContext c) {
        return new RCTSVGAImageView(c, null, 0);
    }

    @ReactProp(name = "source")
    public void setSource(final RCTSVGAImageView view, String source) {
        Context context = view.getContext();
        if (source.startsWith("http") || source.startsWith("https")) {
            try {
                new SVGAParser(context).parse(new URL(source), new SVGAParser.ParseCompletion() {
                    @Override
                    public void onError() {

                    }

                    @Override
                    public void onComplete(SVGAVideoEntity videoItem) {
                        view.setVideoItem(videoItem);
                        view.startAnimation();
                    }

                });
            } catch (Exception e) {
            }
        } else {
            try {
                new SVGAParser(context).parse(source, new SVGAParser.ParseCompletion() {
                    @Override
                    public void onError() {

                    }

                    @Override
                    public void onComplete(SVGAVideoEntity videoItem) {
                        view.setVideoItem(videoItem);
                        view.startAnimation();
                    }
                });
            } catch (Exception e) {
            }
        }
    }

    @ReactProp(name = "loops", defaultInt = 0)
    public void setLoops(RCTSVGAImageView view, int loops) {
        view.setLoops(loops);
    }

    @ReactProp(name = "clearsAfterStop", defaultBoolean = true)
    public void setClearsAfterStop(RCTSVGAImageView view, Boolean clearsAfterStop) {
        view.setClearsAfterStop(clearsAfterStop);
    }

    @ReactProp(name = "currentState")
    public void setCurrentState(RCTSVGAImageView view, String currentState) {
        view.currentState = currentState;
        switch (currentState) {
            case "start":
                view.startAnimation();
                break;
            case "pause":
                view.pauseAnimation();
                break;
            case "stop":
                view.stopAnimation();
                break;
            case "clear":
                view.stopAnimation(true);
                break;
            default:
                break;
        }
    }

    @ReactProp(name = "toFrame", defaultInt = -1)
    public void setToFrame(RCTSVGAImageView view, int toFrame) {
        if (toFrame < 0) {
            return;
        }
        view.stepToFrame(toFrame, view.currentState.equals("play") ? true : false);
    }

    @ReactProp(name = "toPercentage", defaultFloat = -1.0f)
    public void setToPercentage(RCTSVGAImageView view, float toPercentage) {
        if (toPercentage < 0) {
            return;
        }
        view.stepToPercentage((double) toPercentage, view.currentState.equals("play") ? true : false);
    }
}
