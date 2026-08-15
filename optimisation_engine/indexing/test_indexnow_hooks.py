"""Self-check for the IndexNow-on-write hooks. Run: python -m optimisation_engine.indexing.test_indexnow_hooks

Guards the two properties the hooks exist for:
  1. an applied edit queues its URL for the next drain
  2. a bad site key or unwritable queue never fails the edit
"""
import tempfile
from pathlib import Path

from optimisation_engine.apply.base import _queue_for_indexnow
from optimisation_engine.indexing import submit_indexnow
from optimisation_engine.indexing.config import get_site_config

URL = "https://{host}/blog/indexnow-hook-self-check"


def main() -> None:
    host = get_site_config("property")["host"]
    url = URL.format(host=host)

    with tempfile.TemporaryDirectory() as tmp:
        original = submit_indexnow._QUEUE_DIR
        submit_indexnow._QUEUE_DIR = Path(tmp)
        try:
            _queue_for_indexnow("property", url)
            assert submit_indexnow.load_queue("property") == [url], "URL was not queued"

            # idempotent: the same URL twice stays one row
            _queue_for_indexnow("property", url)
            assert len(submit_indexnow.load_queue("property")) == 1, "duplicate queued"

            # off-host URLs are dropped by enqueue, not queued blindly
            _queue_for_indexnow("property", "https://example.com/not-ours")
            assert len(submit_indexnow.load_queue("property")) == 1, "off-host URL queued"

            # never fatal
            _queue_for_indexnow("no-such-site", url)
            _queue_for_indexnow("property", "")
        finally:
            submit_indexnow._QUEUE_DIR = original

    print("OK: indexnow hooks queue, dedupe, reject off-host, and never raise")


if __name__ == "__main__":
    main()
