import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/healthz")
def healthz():
    return {"status": "ok"}, 200


@app.route("/static/videos/<path:filename>")
def videos(filename):
    return send_from_directory(
        os.path.join(app.root_path, "static", "videos"),
        filename,
        conditional=True,
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=False)
