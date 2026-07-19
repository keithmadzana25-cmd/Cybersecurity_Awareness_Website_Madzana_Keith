import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app


def test_app_creates_and_serves_homepage():
    app = create_app('testing')
    client = app.test_client()

    response = client.get('/')
    assert response.status_code == 200
    assert b'CyberSecurity' in response.data
