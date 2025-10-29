# A simple, hard-coded list of tech skills to search for.
# In a real-world app, this list would be much larger or stored in a database.
SKILL_KEYWORDS = [
    'python', 'java', 'c++', 'javascript', 'typescript',
    'react', 'angular', 'vue', 'next.js',
    'node.js', 'express.js', 'django', 'flask',
    'mongodb', 'mysql', 'postgresql', 'sql',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp',
    'git', 'github', 'devops', 'ci/cd',
    'machine learning', 'tensorflow', 'pytorch',
    'data analysis', 'pandas', 'numpy',
    'html', 'css', 'sass',  # Programming Languages
    'c', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust', 'scala', 'r',
    'perl', 'haskell', 'elixir', 'clojure', 'dart', 'lua', 'matlab', 'bash',
    'shell scripting', 'powershell', 'assembly', 'fortran', 'cobol', 'f#',

    # Frontend Frameworks & Libraries
    'react native', 'vue.js', 'nuxt.js', 'gatsby', 'svelte', 'ember.js',
    'backbone.js', 'jquery', 'redux', 'mobx', 'vuex', 'angularjs',
    'bootstrap', 'tailwind css', 'material-ui', 'chakra ui', 'ant design',
    'foundation', 'semantic ui', 'bulma', 'styled components', 'sass',
    'less', 'stylus', 'webpack', 'babel', 'vite', 'parcel', 'rollup',

    # Backend Frameworks
    'spring', 'spring boot', 'laravel', 'ruby on rails', 'asp.net', 'express',
    'koa', 'fastapi', 'nest.js', 'graphql', 'apollo', 'grpc', 'rabbitmq',
    'kafka', 'celery', 'hibernate', 'jpa', 'mybatis', 'entity framework',

    # Mobile Development
    'android development', 'ios development', 'flutter', 'react native',
    'xamarin', 'ionic', 'cordova', 'phonegap', 'swiftui', 'jetpack compose',

    # Databases
    'oracle', 'sqlite', 'mariadb', 'cassandra', 'redis', 'elasticsearch',
    'dynamodb', 'cosmosdb', 'firebase', 'supabase', 'couchbase', 'neo4j',
    'arangodb', 'rethinkdb', 'hbase', 'bigtable', 'snowflake', 'redshift',
    'bigquery', 'tableau', 'power bi', 'looker', 'metabase',

    # Cloud Platforms
    'aws lambda', 'aws ec2', 'aws s3', 'aws rds', 'aws dynamodb', 'aws cloudformation',
    'aws cloudwatch', 'aws iam', 'azure functions', 'azure vm', 'azure blob storage',
    'azure sql', 'azure cosmosdb', 'google cloud functions', 'google compute engine',
    'google cloud storage', 'google bigquery', 'firebase', 'heroku', 'digitalocean',
    'linode', 'vultr', 'cloudflare', 'akamai', 'fastly',

    # DevOps & Infrastructure
    'jenkins', 'gitlab ci', 'github actions', 'circleci', 'travis ci', 'teamcity',
    'ansible', 'puppet', 'chef', 'saltstack', 'terraform', 'cloudformation',
    'packer', 'vagrant', 'prometheus', 'grafana', 'elk stack', 'splunk',
    'new relic', 'datadog', 'sentry', 'logstash', 'kibana', 'istio', 'linkerd',
    'envoy', 'nginx', 'apache', 'tomcat', 'iis', 'haproxy',

    # Containerization & Orchestration
    'docker compose', 'docker swarm', 'kubernetes', 'helm', 'rancher',
    'openshift', 'nomad', 'mesos', 'lxc', 'podman',

    # AI/ML & Data Science
    'scikit-learn', 'keras', 'opencv', 'nltk', 'spacy', 'transformers',
    'hugging face', 'langchain', 'openai', 'stable diffusion', 'midjourney',
    'computer vision', 'natural language processing', 'deep learning',
    'neural networks', 'reinforcement learning', 'supervised learning',
    'unsupervised learning', 'clustering', 'classification', 'regression',
    'time series', 'anomaly detection', 'recommendation systems', 'nlp',
    'computer vision', 'object detection', 'image processing', 'data mining',
    'data visualization', 'business intelligence', 'etl', 'data warehousing',

    # Big Data & Analytics
    'hadoop', 'spark', 'hive', 'pig', 'impala', 'presto', 'kafka', 'flink',
    'storm', 'beam', 'airflow', 'luigi', 'dagster', 'prefect', 'dbt',
    'databricks', 'hdfs', 'mapreduce', 'yarn', 'zeppelin', 'jupyter',

    # Testing & QA
    'jest', 'mocha', 'chai', 'jasmine', 'karma', 'cypress', 'selenium',
    'puppeteer', 'playwright', 'enzyme', 'react testing library', 'phpunit',
    'junit', 'testng', 'mockito', 'power mock', 'cucumber', 'selenium',
    'appium', 'postman', 'soapui', 'jmeter', 'gatling', 'locust',

    # Security
    'oauth', 'jwt', 'openid connect', 'saml', 'ldap', 'ssl/tls', 'cryptography',
    'penetration testing', 'vulnerability assessment', 'siem', 'soc',
    'firewalls', 'vpn', 'ids/ips', 'waf', 'ethical hacking', 'bug bounty',

    # Methodologies & Practices
    'agile', 'scrum', 'kanban', 'lean', 'waterfall', 'devsecops', 'gitops',
    'aiops', 'mlops', 'dataops', 'site reliability engineering', 'sre',
    'microservices', 'monolith', 'serverless', 'domain driven design',
    'test driven development', 'tdd', 'behavior driven development', 'bdd',
    'continuous integration', 'continuous deployment', 'continuous delivery',

    # Tools & Platforms
    'jira', 'confluence', 'trello', 'asana', 'slack', 'microsoft teams',
    'zoom', 'figma', 'sketch', 'adobe xd', 'invision', 'zeplin', 'photoshop',
    'illustrator', 'blender', 'unity', 'unreal engine', 'wordpress', 'shopify',
    'magento', 'woocommerce', 'drupal', 'joomla', 'wix', 'squarespace',

    # Operating Systems
    'linux', 'ubuntu', 'centos', 'red hat', 'debian', 'fedora', 'windows server',
    'macos', 'windows', 'unix', 'freebsd', 'arch linux', 'kali linux',

    # Networking
    'tcp/ip', 'dns', 'dhcp', 'http', 'https', 'rest', 'soap', 'websockets',
    'cdn', 'load balancing', 'vpn', 'ssl', 'tls', 'ssh', 'ftp', 'sftp',

    # Soft Skills
    'problem solving', 'critical thinking', 'communication', 'teamwork',
    'leadership', 'project management', 'time management', 'adaptability',
    'creativity', 'collaboration', 'mentoring', 'public speaking',
    'technical writing', 'documentation', 'client management', 'stakeholder management'
]


def extract_skills(raw_text):
    """
    Scans raw text and finds skills from our SKILL_KEYWORDS list.
    """
    found_skills = set()  # Use a 'set' to avoid duplicate skills
    text_lower = raw_text.lower()  # Convert text to lowercase for easy matching

    for skill in SKILL_KEYWORDS:
        if skill.lower() in text_lower:
            found_skills.add(skill.lower())

    # Convert the set back to a list to send as JSON
    return list(found_skills)
